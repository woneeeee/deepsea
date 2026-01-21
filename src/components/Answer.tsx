'use client';

import { useState } from 'react';
import Button from '@/components/Button';

interface AnswerProps {
  question: string; // Q. 뒤에 올 질문 내용
  answerPrompt?: string; // A. 뒤에 올 프롬프트 (기본값: "지금 마음에 남아 있는 느낌을 자유롭게 적어주세요")
  maxLength?: number; // 최대 글자 수 (기본값: 200)
  onSave?: (answer: string) => void; // 저장하기 버튼 클릭 시 호출되는 함수
}

export default function Answer({ question, maxLength = 200, onSave }: AnswerProps) {
  const [answer, setAnswer] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave(answer);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        {(() => {
          const hasBrTag = question.includes('<br/>');
          return hasBrTag ? (
            <p className="subtitle-24m text-white">
              <span className="font-bold">Q.</span>{' '}
              <span dangerouslySetInnerHTML={{ __html: question }} />
            </p>
          ) : (
            <p className="body-18 text-white">
              <span className="font-bold">Q.</span> {question}
            </p>
          );
        })()}
      </div>

      {/* 답변 영역 */}
      <div className="flex gap-2">
        <p className="text-white">
          <span className="subtitle-24m font-bold">A.</span>
        </p>
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setAnswer(e.target.value);
              }
            }}
            placeholder="지금 마음에 남아 있는 느낌을 자유롭게 적어주세요"
            className="body-18 w-[614px] overflow-y-auto rounded-[20px] border border-gray-100 pt-[28px] pr-[28px] pb-[50px] pl-[28px] text-white placeholder-gray-400 focus:outline-none"
            rows={2}
            style={{
              resize: 'none',
              height: 'auto',
              minHeight: '154px',
              maxHeight: '154px',
            }}
          />
          <div className="caption-14 absolute right-5 bottom-5 text-gray-100">
            ({answer.length}/{maxLength})
          </div>
        </div>
      </div>

      <div onClick={handleSave} className="flex cursor-pointer justify-end pr-[32px]">
        <img src="icons/save.svg" alt="save" width={95} height={42} />
      </div>
    </div>
  );
}
