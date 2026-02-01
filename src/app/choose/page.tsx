'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import ChooseModal from '@/components/ChooseModal';
import { VIDEO_BASE_URL } from '@/constants/emotionTexts';

// 메인 감정 후보 (1, 5, 7, 8, 9) — explore에서 찾은 것만 choose에서 표시
const ALL_MAIN_EMOTIONS = [1, 5, 7, 8, 9];

export default function ChoosePage() {
  const [unlockedEmotions, setUnlockedEmotions] = useState<Set<number>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('unlockedEmotions');
    if (stored) {
      try {
        const arr = JSON.parse(stored) as number[];
        setUnlockedEmotions(new Set(arr));
      } catch {
        setUnlockedEmotions(new Set());
      }
    }
  }, []);

  // explore에서 찾은(언락된) 메인 감정만 표시
  const mainEmotions = useMemo(
    () => ALL_MAIN_EMOTIONS.filter((e) => unlockedEmotions.has(e)),
    [unlockedEmotions],
  );

  useEffect(() => {
    if (mainEmotions.length > 0 && selectedIndex >= mainEmotions.length) {
      setSelectedIndex(mainEmotions.length - 1);
    }
  }, [mainEmotions.length, selectedIndex]);

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
    // 선택된 감정 번호를 localStorage에 저장
    const selectedEmotion = mainEmotions[selectedIndex];
    localStorage.setItem('selectedEmotion', selectedEmotion.toString());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const currentEmotion = mainEmotions[selectedIndex];
  const hasMainEmotions = mainEmotions.length > 0;

  return (
    <div className="bg-base bg-choose relative flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        {hasMainEmotions ? (
          <>
            {/* 메인 감정 캐러셀 — explore에서 찾은 것만 */}
            <div className="flex items-center justify-center gap-[180px]">
              <button
                onClick={handlePrev}
                className="flex items-center justify-center text-white transition-opacity hover:opacity-70"
                aria-label="이전 감정"
              >
                <Image src="/icons/left.svg" alt="arrow left" width={88} height={88} />
              </button>

              <div className="flex items-center justify-center">
                <video
                  src={`${VIDEO_BASE_URL}/big-emotion${currentEmotion}.webm`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-[800px] w-[800px] cursor-pointer object-contain transition-opacity hover:opacity-90"
                  onClick={handleVideoClick}
                />
              </div>

              <button
                onClick={handleNext}
                className="flex items-center justify-center text-white transition-opacity hover:opacity-70"
                aria-label="다음 감정"
              >
                <Image src="/icons/right.svg" alt="arrow right" width={88} height={88} />
              </button>
            </div>

            <div
              className="flex w-[361px] flex-col items-center justify-center rounded-[1000px] border border-white/10 p-[12px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(229, 237, 249, 0.20) 0%, rgba(229, 237, 249, 0.02) 100%)',
              }}
            >
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
                    key={mainEmotions[index]}
                    onClick={() => setSelectedIndex(index)}
                    className="relative flex items-center justify-center transition-all"
                    aria-label={`감정 ${mainEmotions[index]} 선택`}
                  >
                    {index === selectedIndex ? (
                      <>
                        <div className="absolute h-[28px] w-[28px] rounded-full bg-white/30" />
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
          </>
        ) : (
          <div className="seogang-32 text-center text-white">
            아직 찾은 메인 감정이 없어요.
            <br />
            explore에서 감정(1, 5, 7, 8, 9)을 먼저 찾아주세요.
          </div>
        )}

        <div className="seogang-32 mt-[44px] text-center text-white">
          마지막으로 가져 갈
          <br />
          나만의 보물 하나를 선택하세요
        </div>
      </div>

      <ChooseModal isOpen={isModalOpen} onConfirm={handleConfirm} onCancel={handleCancel} />
    </div>
  );
}
