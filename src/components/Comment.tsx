'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface CommentProps {
  emotionIndex: number;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  username?: string;
}

export default function Comment({ emotionIndex, onClose }: CommentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const prevMessagesLengthRef = useRef<number>(0);

  const postId = emotionIndex + 1; // 감정 번호를 postId로 사용

  // 사용자 이름 불러오기
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await fetch('http://localhost:8080/user');
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || '');
        }
      } catch (error) {
        console.error('사용자 이름 불러오기 실패:', error);
      }
    };

    fetchUsername();
  }, []);

  // 댓글 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:8080/posts/${postId}/comments`);
        if (res.ok) {
          const data = await res.json();
          const loadedMessages: Message[] = data.map((comment: any) => ({
            id: comment.id.toString(),
            text: comment.content,
            isUser: true,
            timestamp: new Date(comment.created_at),
            username: comment.username,
          }));
          setMessages(loadedMessages);
          prevMessagesLengthRef.current = loadedMessages.length;
        }
      } catch (error) {
        console.error('댓글 불러오기 실패:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // 애니메이션 후 이전 메시지 길이 업데이트
    if (messages.length > prevMessagesLengthRef.current) {
      const timer = setTimeout(() => {
        prevMessagesLengthRef.current = messages.length;
      }, 400); // 애니메이션 시간과 동일
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !username) return;

    const content = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    try {
      // 백엔드에 댓글 저장
      const res = await fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          content,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // 저장된 댓글을 메시지에 추가
        const newMessage: Message = {
          id: data.commentId.toString(),
          text: content,
          isUser: true,
          timestamp: new Date(),
          username,
        };

        setMessages((prev) => [...prev, newMessage]);
        prevMessagesLengthRef.current = messages.length;
      } else {
        console.error('댓글 저장 실패');
        // 실패 시 입력값 복원
        setInputValue(content);
      }
    } catch (error) {
      console.error('댓글 저장 중 오류:', error);
      // 실패 시 입력값 복원
      setInputValue(content);
    } finally {
      setIsLoading(false);
      // 입력 필드 포커스 유지
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex h-[1000px] w-[420px] flex-col overflow-visible">
      {/* 헤더 */}
      <div className="comment-header-gradient absolute top-0 right-0 left-0 z-20 flex h-[100px] gap-4 rounded-[20px] p-[30px]">
        <button
          onClick={onClose}
          className="relative z-10 flex items-start p-2 transition-opacity hover:opacity-70"
          aria-label="뒤로가기"
        >
          <Image src="/icons/back.svg" alt="back" width={24} height={24} />
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className="-mt-[100px] flex flex-1 flex-col overflow-y-auto px-4">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-end justify-center pb-6">
            <div className="flex flex-col gap-[12px] text-white">메시지가 없습니다.</div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-end gap-[12px]">
            {messages.map((message, index) => {
              const isNewMessage = index >= prevMessagesLengthRef.current;
              return (
                <div
                  key={message.id}
                  className={isNewMessage ? 'animate-slide-up' : ''}
                  style={
                    isNewMessage
                      ? {
                          animation: 'slideUp 0.4s ease-out',
                        }
                      : undefined
                  }
                >
                  <div
                    className="flex w-[380px] items-start gap-[12px] rounded-[20px] border border-white/10 p-[24px]"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(229, 237, 249, 0.20) 0%, rgba(229, 237, 249, 0.02) 100%)',
                    }}
                  >
                    <p className="caption-14 flex items-start gap-[12px] text-gray-100">
                      <Image src="icons/comment-line.svg" alt="comment-line" width={1} height={1} />
                      {message.text}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="flex justify-center">
        <div className="flex items-start gap-3">
          <div className="relative mt-[10px] flex h-[56px] w-[380px] items-center justify-center rounded-[20px] border border-white/10 p-[12px]">
            <Image
              src="/icons/comment-line.svg"
              alt="comment-line"
              width={1}
              height={1}
              className="mx-[12px]"
            />
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="자유롭게 의견을 남겨보세요"
              className="caption-14 w-[304px] resize-none text-white placeholder-gray-100 focus:outline-none"
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading || !username}
              className="flex cursor-pointer items-start justify-start disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Image src="/icons/upload.svg" alt="upload" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
