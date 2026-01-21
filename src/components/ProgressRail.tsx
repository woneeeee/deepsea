'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/contexts/ModalContext';

export default function ProgressRail() {
  const { emotionIndex, isOpen } = useModal();
  const [unlockedEmotions, setUnlockedEmotions] = useState<Set<number>>(new Set());

  // localStorage에서 unlock 상태 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('unlockedEmotions');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUnlockedEmotions(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse unlocked emotions:', e);
      }
    }
  }, []);

  // 모달이 열릴 때 해당 emotion을 unlock 상태로 저장
  useEffect(() => {
    if (isOpen && emotionIndex !== null) {
      const newUnlocked = new Set(unlockedEmotions);
      newUnlocked.add(emotionIndex);
      setUnlockedEmotions(newUnlocked);
      localStorage.setItem('unlockedEmotions', JSON.stringify(Array.from(newUnlocked)));
    }
  }, [isOpen, emotionIndex]);

  return (
    <div
      className="fixed top-1/2 right-8 z-30 flex -translate-y-1/2 flex-col items-center"
      style={{
        width: '80px',
      }}
    >
      <img src="/icons/end.svg" alt="end" width={72} height={72} />

      {/* 상단 화살표 */}
      <div className="mb-3 flex items-center justify-center">
        <img src="/icons/top.svg" alt="scroll up" width={24} height={24} />
      </div>

      {/* 메인 스크롤 영역 */}
      <div
        className="relative overflow-x-hidden overflow-y-auto"
        style={{
          width: '80px',
          height: 'calc(85vh - 200px)',
          maxHeight: '700px',
          background:
            'linear-gradient(135deg, rgba(42, 42, 42, 0.6) 0%, rgba(26, 26, 26, 0.6) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(0, 150, 255, 0.4)',
          boxShadow: '0 0 20px rgba(0, 150, 255, 0.3), inset 0 0 40px rgba(0, 150, 255, 0.05)',
        }}
      >
        <div className="flex flex-col items-center gap-3 px-2 py-4">
          {(() => {
            // 그룹별 emotion 순서: [2,3,7], [5,11,15], [6,8,12], [1,10,14], [4,9,13]
            const emotionGroups = [
              [2, 3, 7],
              [5, 11, 15],
              [6, 8, 12],
              [1, 10, 14],
              [4, 9, 13],
            ];

            const items: React.ReactNode[] = [];

            emotionGroups.forEach((group, groupIndex) => {
              group.forEach((emotionNum) => {
                const emotionIndex = emotionNum - 1;
                const isUnlocked = unlockedEmotions.has(emotionIndex);

                items.push(
                  <div
                    key={emotionNum}
                    className="relative flex items-center justify-center"
                    style={{
                      width: '56px',
                      height: '56px',
                      minHeight: '56px',
                    }}
                  >
                    <img
                      src={
                        isUnlocked
                          ? `/icons/unlock-${emotionNum}.svg`
                          : `/icons/lock-${emotionNum}.png`
                      }
                      alt={isUnlocked ? `unlocked-${emotionNum}` : `locked-${emotionNum}`}
                      className="h-full w-full object-contain"
                      style={{
                        filter: isUnlocked
                          ? 'drop-shadow(0 0 12px rgba(0, 150, 255, 0.8))'
                          : 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))',
                        transition: 'filter 0.3s ease',
                      }}
                    />
                  </div>,
                );
              });

              if (groupIndex < emotionGroups.length - 1) {
                items.push(
                  <div
                    key={`line-${groupIndex}`}
                    className="my-2 flex items-center justify-center"
                    style={{
                      width: '57px',
                      height: '1px',
                      minHeight: '1px',
                    }}
                  >
                    <img
                      src="/icons/progress-line.svg"
                      alt="progress line"
                      className="h-full w-full object-contain"
                    />
                  </div>,
                );
              }
            });

            return items;
          })()}
        </div>
      </div>

      {/* 하단 화살표 */}
      <div className="mt-3 flex items-center justify-center">
        <img src="/icons/down.svg" alt="scroll down" width={24} height={24} />
      </div>
      <img src="/icons/key.svg" alt="key" width={72} height={72} />
    </div>
  );
}
