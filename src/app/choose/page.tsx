'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import ChooseModal from '@/components/ChooseModal';

export default function ChoosePage() {
  // useBigOrSmallFrame을 사용하는 감정들: 1, 5, 7, 8, 9
  const mainEmotions = [1, 5, 7, 8, 9];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? mainEmotions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === mainEmotions.length - 1 ? 0 : prev + 1));
  };

  const handleVideoClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    // 선택 확정 로직 (예: 다음 페이지로 이동)
    setIsModalOpen(false);
    // TODO: 선택된 감정 저장 및 다음 페이지로 이동
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const currentEmotion = mainEmotions[selectedIndex];

  return (
    <div className="bg-base bg-choose relative flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        {/* 메인 감정 캐러셀 */}
        <div className="flex items-center justify-center gap-[180px]">
          {/* 왼쪽 화살표 */}
          <button
            onClick={handlePrev}
            className="flex items-center justify-center text-white transition-opacity hover:opacity-70"
            aria-label="이전 감정"
          >
            <Image src="/icons/left.svg" alt="arrow left" width={88} height={88} />
          </button>

          {/* 중앙 감정 이미지 */}
          <div className="flex items-center justify-center">
            <video
              src={`/icons/big-emotion${currentEmotion}.webm`}
              autoPlay
              loop
              muted
              playsInline
              className="h-[800px] w-[800px] cursor-pointer object-contain transition-opacity hover:opacity-90"
              onClick={handleVideoClick}
            />
          </div>

          {/* 오른쪽 화살표 */}
          <button
            onClick={handleNext}
            className="flex items-center justify-center text-white transition-opacity hover:opacity-70"
            aria-label="다음 감정"
          >
            <Image src="/icons/right.svg" alt="arrow right" width={88} height={88} />
          </button>
        </div>

        {/* 하단 인디케이터 및 텍스트 */}
        <div
          className="flex w-[361px] flex-col items-center justify-center rounded-[1000px] border border-white/10 p-[12px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(229, 237, 249, 0.20) 0%, rgba(229, 237, 249, 0.02) 100%)',
          }}
        >
          {/* 점 인디케이터 */}
          <div className="flex items-center gap-[32px]">
            <Image
              onClick={handlePrev}
              src="/icons/chevron-left.svg"
              alt="arrow left"
              width={24}
              height={24}
            />
            {mainEmotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className="relative flex items-center justify-center transition-all"
                aria-label={`감정 ${mainEmotions[index]} 선택`}
              >
                {index === selectedIndex ? (
                  <>
                    {/* 외부 원 (큰 반투명) */}
                    <div className="absolute h-[28px] w-[28px] rounded-full bg-white/30" />
                    {/* 내부 원 (작은 불투명) */}
                    <div className="relative h-[14px] w-[14px] rounded-full bg-white" />
                  </>
                ) : (
                  <div className="h-[14px] w-[14px] rounded-full bg-gray-400" />
                )}
              </button>
            ))}
            <Image
              onClick={handleNext}
              src="/icons/chevron-right.svg"
              alt="arrow right"
              width={24}
              height={24}
            />
          </div>
        </div>
        {/* 안내 텍스트 */}
        <div className="seogang-32 mt-[44px] text-center text-white">
          마지막으로 가져 갈
          <br />
          나만의 보물 하나를 선택하세요
        </div>
      </div>

      {/* 선택 확인 모달 */}
      <ChooseModal isOpen={isModalOpen} onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  );
}
