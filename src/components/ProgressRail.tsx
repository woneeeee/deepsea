'use client';

import { useState, useEffect, useRef } from 'react';
import { useModal } from '@/contexts/ModalContext';

const ITEM_HEIGHT = 60;
const GAP = 12;
const ITEMS_PER_PAGE = 6;
const PAGE_HEIGHT = ITEMS_PER_PAGE * ITEM_HEIGHT + (ITEMS_PER_PAGE - 1) * GAP;

interface ProgressRailProps {
  onEndClick?: () => void;
}

export default function ProgressRail({ onEndClick }: ProgressRailProps) {
  const { emotionIndex, isOpen } = useModal();
  const [unlockedEmotions, setUnlockedEmotions] = useState<Set<number>>(new Set());
  const [isVisible, setIsVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -PAGE_HEIGHT, behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: PAGE_HEIGHT, behavior: 'smooth' });
    }
  };

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

  // 모달이 열릴 때 해당 emotion을 unlock 상태로 저장 (감정 번호 1~15로 저장 — Modal/choose와 동일)
  useEffect(() => {
    if (isOpen && emotionIndex !== null) {
      const emotionNumber = emotionIndex + 1;
      setUnlockedEmotions((prev) => {
        const next = new Set(prev);
        next.add(emotionNumber);
        localStorage.setItem('unlockedEmotions', JSON.stringify(Array.from(next)));
        return next;
      });
    }
  }, [isOpen, emotionIndex]);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  // useBigOrSmallFrame을 사용하는 감정들: 1, 5, 7, 8, 9 (감정 번호)
  const bigOrSmallFrameEmotions = [1, 5, 7, 8, 9];
  const hasUnlockedBigOrSmallFrame = bigOrSmallFrameEmotions.some((num) =>
    unlockedEmotions.has(num),
  );

  const handleEndClick = () => {
    if (!hasUnlockedBigOrSmallFrame) return;
    onEndClick?.();
  };

  return (
    <div
      className="fixed top-1/2 right-8 z-30 flex -translate-y-1/2 flex-col items-center"
      style={{
        width: '80px',
        borderRadius: '2000px',
        background: 'linear-gradient(135deg, rgba(42, 42, 42, 0.6) 0%, rgba(26, 26, 26, 0.6) 100%)',
        border: '1px solid rgba(0, 150, 255, 0.4)',
        boxShadow: '0 0 20px rgba(0, 150, 255, 0.3), inset 0 0 40px rgba(0, 150, 255, 0.05)',
      }}
    >
      {isVisible && (
        <>
          <button
            type="button"
            onClick={handleEndClick}
            disabled={!hasUnlockedBigOrSmallFrame}
            aria-disabled={!hasUnlockedBigOrSmallFrame}
            aria-label="엔딩 이동"
            className="transition disabled:cursor-not-allowed disabled:opacity-60"
            style={{ lineHeight: 0 }}
          >
            <img
              src={hasUnlockedBigOrSmallFrame ? '/icons/end.svg' : '/icons/disabled-end.svg'}
              alt="end"
              width={72}
              height={72}
            />
          </button>

          {/* 상단 화살표 — 항상 보임, 클릭 시 위로 한 페이지 */}
          <div className="my-5 flex items-center justify-center">
            <button
              type="button"
              onClick={handleScrollUp}
              aria-label="위로 스크롤"
              className="flex items-center justify-center transition-opacity hover:opacity-80"
            >
              <img src="/icons/top.svg" alt="scroll up" width={24} height={24} />
            </button>
          </div>

          {/* 메인 스크롤 영역 — 한 화면에 6개만 보이도록 고정 높이 */}
          <div
            ref={scrollRef}
            className="relative overflow-x-hidden overflow-y-auto"
            style={{
              width: '80px',
              height: PAGE_HEIGHT,
              // background:
              //   'linear-gradient(135deg, rgba(42, 42, 42, 0.6) 0%, rgba(26, 26, 26, 0.6) 100%)',
              // borderRadius: '20px',
              // border: '1px solid rgba(0, 150, 255, 0.4)',
              // boxShadow: '0 0 20px rgba(0, 150, 255, 0.3), inset 0 0 40px rgba(0, 150, 255, 0.05)',
            }}
          >
            <div className="flex flex-col items-center gap-3 px-2 py-4" style={{ gap: GAP }}>
              {(() => {
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
                    const isUnlocked = unlockedEmotions.has(emotionNum);

                    items.push(
                      <div
                        key={emotionNum}
                        className="relative flex shrink-0 items-center justify-center"
                        style={{
                          width: '56px',
                          height: `${ITEM_HEIGHT}px`,
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
                        className="flex shrink-0 items-center justify-center py-1"
                        style={{ width: '57px', height: '1px' }}
                      >
                        <img
                          src="/icons/progress-line.svg"
                          alt=""
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

          {/* 하단 화살표 — 항상 보임, 클릭 시 아래로 한 페이지 */}
          <div className="my-5 flex items-center justify-center">
            <button
              type="button"
              onClick={handleScrollDown}
              aria-label="아래로 스크롤"
              className="flex items-center justify-center transition-opacity hover:opacity-80"
            >
              <img src="/icons/down.svg" alt="scroll down" width={24} height={24} />
            </button>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={toggleVisibility}
        aria-pressed={isVisible}
        aria-label={isVisible ? '스크롤 레일 숨기기' : '스크롤 레일 보이기'}
        className="mt-3 flex items-end justify-center transition focus:outline-none"
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, rgba(42,42,42,0.7), rgba(20,20,20,0.7))',
          border: '1px solid rgba(0, 150, 255, 0.4)',
          boxShadow: '0 0 12px rgba(0, 150, 255, 0.35)',
        }}
      >
        <img src="/icons/key.svg" alt="toggle rail" width={72} height={72} />
      </button>
    </div>
  );
}
