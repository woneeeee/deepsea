'use client';

import { useState, useEffect } from 'react';
import { useModal } from '@/contexts/ModalContext';
import ModalFrame from '@/components/ModalFrame';
import SmallModalFrame from '@/components/SmallModalFrame';
import MiddleModalFrame from '@/components/MiddleModalFrame';
import Answer from '@/components/Answer';
import Comment from '@/components/Comment';
import {
  getEmotionText,
  getEmotionQuestion,
  getEmotionTitle,
  getEmotionTitleBig,
  getRelatedEmotions,
  VIDEO_BASE_URL,
} from '@/constants/emotionTexts';

export default function Modal() {
  const { isOpen, emotionIndex, closeModal } = useModal();
  const [isSmall, setIsSmall] = useState(false);
  const [showComment, setShowComment] = useState(false);

  // localStorage에서 unlock된 감정들을 불러오기
  const getUnlockedEmotionsFromStorage = (): Set<number> => {
    if (typeof window === 'undefined') return new Set();
    const stored = localStorage.getItem('unlockedEmotions');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return new Set(parsed);
      } catch {
        return new Set();
      }
    }
    return new Set();
  };

  const [unlockedEmotions, setUnlockedEmotions] = useState<Set<number>>(
    getUnlockedEmotionsFromStorage,
  );

  // 현재 열린 감정을 unlock 상태로 저장
  useEffect(() => {
    if (emotionIndex !== null) {
      const emotionNumber = emotionIndex + 1;
      setUnlockedEmotions((prev) => {
        const newSet = new Set(prev);
        newSet.add(emotionNumber);
        // localStorage에 저장
        if (typeof window !== 'undefined') {
          localStorage.setItem('unlockedEmotions', JSON.stringify(Array.from(newSet)));
        }
        return newSet;
      });
    }
  }, [emotionIndex]);

  if (!isOpen || emotionIndex === null) return null;

  const handleClose = () => {
    setIsSmall(false);
    setShowComment(false);
    closeModal();
  };

  // emotion 1, 5, 6, 7, 8, 9 (인덱스 0, 4, 5, 6, 7, 8)는 ModalFrame/SmallModalFrame 사용
  // 나머지는 MiddleModalFrame 사용
  const useBigOrSmallFrame = [0, 4, 6, 7, 8].includes(emotionIndex);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleClose}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {useBigOrSmallFrame ? (
          isSmall ? (
            <SmallModalFrame
              style={{
                width: '90vw',
                maxWidth: '1500px',
                height: '100vh',
                maxHeight: '1700px',
                marginLeft: '-300px',
                transition: 'width 0.3s ease, max-width 0.3s ease',
              }}
            />
          ) : (
            <ModalFrame
              style={{
                width: '90vw',
                maxWidth: '1600px',
                height: '100vh',
                maxHeight: '1700px',
                transition: 'width 0.3s ease, max-width 0.3s ease',
              }}
            />
          )
        ) : (
          <MiddleModalFrame
            style={{
              width: '90vw',
              maxWidth: '1600px',
              height: '100vh',
              maxHeight: '1700px',
              transition: 'width 0.3s ease, max-width 0.3s ease',
            }}
          />
        )}
      </div>
      <div
        className="relative z-10 flex overflow-visible"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isSmall ? '50vw' : '90vw',
          maxWidth: isSmall ? '800px' : '1400px',
          height: '85vh',
          maxHeight: '900px',
          transition: 'width 0.3s ease, max-width 0.3s ease',
        }}
      >
        <div
          className={useBigOrSmallFrame ? 'flex-shrink-0' : 'flex flex-shrink-0 flex-col'}
          style={{
            width: useBigOrSmallFrame ? (isSmall ? '700px' : '800px') : '600px',
            marginLeft: useBigOrSmallFrame ? (isSmall ? '-530px' : '-100px') : '30px',
            marginTop: useBigOrSmallFrame ? (isSmall ? '0px' : '0px') : '-200px',
            opacity: isSmall ? 1 : 1,
            transition: 'width 0.3s ease, margin-left 0.3s ease, opacity 0.3s ease',
          }}
        >
          {!useBigOrSmallFrame ? (
            <video
              src={`${VIDEO_BASE_URL}/big-emotion${emotionIndex + 1}.webm`}
              autoPlay
              loop
              muted
              playsInline
              className="mt-10 h-[1000px] w-[1000px] object-contain"
            />
          ) : (
            <video
              src={`${VIDEO_BASE_URL}/big-emotion${emotionIndex + 1}.webm`}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-contain"
            />
          )}
          {!useBigOrSmallFrame &&
            (() => {
              const titleData = getEmotionTitle(emotionIndex + 1);
              if (!titleData) return null;
              return (
                <div className="-mt-40 ml-[10px] flex flex-col gap-[12px]">
                  <h3 className="bombaram-72 font-bold text-white">{titleData.title}</h3>
                  <p className="bombaram-24 text-white">{titleData.description}</p>
                </div>
              );
            })()}
        </div>

        <div
          className={`relative flex flex-1 flex-col overflow-visible ${!useBigOrSmallFrame ? 'gap-[45px]' : 'gap-[70px]'}`}
        >
          <div className="flex items-start justify-center pt-5">
            {useBigOrSmallFrame ? (
              <div className="flex w-full flex-col items-center">
                <img
                  src={`/icons/des-emotion${emotionIndex + 1}.svg`}
                  alt={`description-${emotionIndex + 1}`}
                  className="object-contain"
                  style={{
                    width: isSmall ? '100%' : '90%',
                    height: isSmall ? 'auto' : 'auto',
                    maxWidth: isSmall ? '600px' : '100%',
                    maxHeight: isSmall ? '500px' : '100%',
                    marginLeft: isSmall ? '0px' : '-100px',
                    marginTop: isSmall ? '50px' : '0px',
                    transition:
                      'max-width 0.3s ease, max-height 0.3s ease, margin-left 0.3s ease, margin-top 0.3s ease, width 0.3s ease',
                  }}
                />
                {(() => {
                  const titleData = getEmotionTitleBig(emotionIndex + 1);
                  if (!titleData) return null;
                  const hasBrTag = titleData.description.includes('<br/>');

                  return (
                    <div className="mt-6 ml-[10px] flex w-full flex-col gap-[12px]">
                      <div className="flex gap-[12px]">
                        <h3 className="subtitle-40 font-bold text-white">{titleData.title}</h3>
                        <p className="subtitle-24m flex items-end justify-end text-white">
                          {titleData.subtitle}
                        </p>
                      </div>
                      {titleData.description &&
                        (hasBrTag ? (
                          <p
                            className="body-18 text-white"
                            dangerouslySetInnerHTML={{ __html: titleData.description }}
                          />
                        ) : (
                          <p className="body-18 text-white">{titleData.description}</p>
                        ))}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div
                className="mt-15 flex w-full max-w-2xl flex-col gap-[40px]"
                style={{ overflow: 'hidden' }}
              >
                {(() => {
                  const text = getEmotionText(emotionIndex + 1);
                  const hasBrTag = text.includes('<br/>');
                  return hasBrTag ? (
                    <p
                      className="body-18 h-[174px] px-[32px] text-white"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  ) : (
                    <p
                      className="body-18 h-[174px] px-[32px] text-white"
                      style={{
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {text}
                    </p>
                  );
                })()}
                <Answer
                  question={getEmotionQuestion(emotionIndex + 1)}
                  onSave={(answer) => {
                    // 감정 번호별로 답변을 localStorage에 저장
                    if (typeof window !== 'undefined' && emotionIndex !== null) {
                      const emotionNumber = emotionIndex + 1;
                      const savedAnswers = JSON.parse(
                        localStorage.getItem('emotionAnswers') || '{}',
                      );
                      savedAnswers[emotionNumber] = answer;
                      localStorage.setItem('emotionAnswers', JSON.stringify(savedAnswers));
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* 연관감정 섹션 - 모든 감정 모달에 표시 */}
          {(() => {
            const relatedEmotions = getRelatedEmotions(emotionIndex + 1);
            if (relatedEmotions.length === 0) return null;

            return (
              <div className={`flex flex-col gap-4 ${!useBigOrSmallFrame ? 'ml-[60px]' : ''}`}>
                <h4 className="body-18 font-bold text-white">연관감정</h4>
                <div className="flex gap-[32px]">
                  {relatedEmotions.map((emotionNum) => {
                    const isUnlocked = unlockedEmotions.has(emotionNum);
                    return (
                      <button
                        key={emotionNum}
                        onClick={(e) => {
                          e.stopPropagation();
                          setUnlockedEmotions((prev) => {
                            const newSet = new Set(prev);
                            if (newSet.has(emotionNum)) {
                              newSet.delete(emotionNum);
                            } else {
                              newSet.add(emotionNum);
                            }
                            // localStorage에 저장
                            if (typeof window !== 'undefined') {
                              localStorage.setItem(
                                'unlockedEmotions',
                                JSON.stringify(Array.from(newSet)),
                              );
                            }
                            return newSet;
                          });
                        }}
                        className="relative h-[136px] w-[136px] overflow-hidden rounded-lg"
                      >
                        <img
                          src={`/icons/emotion-${isUnlocked ? 'unlock' : 'lock'}-${emotionNum}.png`}
                          alt={`emotion-${emotionNum}`}
                          className="h-[136px] w-[136px] object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* 코멘트 버튼 - useBigOrSmallFrame일 때만 표시 */}
          {useBigOrSmallFrame && (
            <div
              className="absolute"
              style={{
                bottom: isSmall ? '-40px' : '-0.75rem',
                right: isSmall ? '-90px' : '0',
                transition: 'bottom 0.3s ease, right 0.3s ease',
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (showComment) {
                    setShowComment(false);
                    setIsSmall(false);
                  } else {
                    setIsSmall(true);
                    setShowComment(true);
                  }
                }}
                className="rounded-full border border-gray-200 bg-[linear-gradient(180deg,rgba(229,237,249,0.2)_0%,rgba(229,237,249,0.02)_100%)] p-6"
              >
                <img src="/icons/comment.svg" alt="comment" width={24} height={24} />
              </button>
            </div>
          )}
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute z-20"
          style={{
            top: isSmall ? '0px' : '1.5rem',
            left: isSmall ? '-350px' : '2.25rem',
            transition: 'top 0.3s ease, left 0.3s ease',
          }}
          aria-label="닫기"
        >
          <img src="/icons/close.svg" alt="close" width={24} height={24} />
        </button>
      </div>
      {/* Comment 사이드바 */}
      {showComment && (
        <div
          className="absolute top-[200px] right-[350px] z-30 mt-[30px] h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Comment emotionIndex={emotionIndex} onClose={() => setShowComment(false)} />
        </div>
      )}
    </div>
  );
}
