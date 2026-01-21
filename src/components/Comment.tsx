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
}

export default function Comment({ emotionIndex, onClose }: CommentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const prevMessagesLengthRef = useRef<number>(0);

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

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // 입력 필드 포커스 유지
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
              disabled={!inputValue.trim()}
              className="flex cursor-pointer items-start justify-start"
            >
              <Image src="/icons/upload.svg" alt="upload" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
