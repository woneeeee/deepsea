'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getEmotionQuestion, getIslandDescription, VIDEO_BASE_URL } from '@/constants/emotionTexts';
import LetterModalFrame from '@/components/LetterModalFrame';

// 메인 감정별 서브 감정 그룹 매핑
const EMOTION_GROUPS: Record<number, number[]> = {
  1: [10, 14], // 메인 1 -> 서브 10, 14
  5: [11, 15], // 메인 5 -> 서브 11, 15
  6: [8, 12], // 메인 6 -> 서브 8, 12
  7: [2, 3], // 메인 7 -> 서브 2, 3
  9: [4, 13], // 메인 9 -> 서브 4, 13
};

// 메인 감정별 섬 이름 매핑
const ISLAND_NAMES: Record<number, string> = {
  1: '우정섬',
  5: '분노섬',
  7: '사랑섬',
  8: '상실섬',
  9: '방어섬',
};

interface SavedAnswer {
  emotionNumber: number;
  question: string;
  answer: string;
}

export default function IslandPage() {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>([]);

  useEffect(() => {
    // localStorage에서 선택된 감정 번호 불러오기
    const stored = localStorage.getItem('selectedEmotion');
    if (stored) {
      setSelectedEmotion(parseInt(stored, 10));
    }

    // 사용자 이름 불러오기
    const fetchUsername = async () => {
      try {
        const res = await fetch('http://localhost:8080/user');
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || null);
        }
      } catch (error) {
        console.error('사용자 이름 불러오기 실패:', error);
      }
    };

    fetchUsername();
  }, []);

  // 감정 번호에 따른 배경 매핑: 1->screen1, 5->screen2, 7->screen7, 8->screen8, 9->screen9
  const getBackgroundClass = (emotion: number | null): string => {
    if (!emotion) return 'bg-base';
    const emotionToScreen: Record<number, string> = {
      1: 'bg-screen1',
      5: 'bg-screen2',
      7: 'bg-screen7',
      8: 'bg-screen8',
      9: 'bg-screen9',
    };
    return emotionToScreen[emotion] || 'bg-base';
  };

  const handleLetterClick = () => {
    if (selectedEmotion) {
      // 선택된 메인 감정과 같은 조의 서브 감정들 가져오기
      const subEmotions = EMOTION_GROUPS[selectedEmotion] || [];

      // localStorage에서 모든 저장된 답변 불러오기
      const allSavedAnswers = JSON.parse(localStorage.getItem('emotionAnswers') || '{}');

      // 같은 조의 서브 감정들의 답변만 필터링
      const filteredAnswers: SavedAnswer[] = subEmotions
        .map((emotionNum) => {
          const answer = allSavedAnswers[emotionNum];
          if (answer) {
            return {
              emotionNumber: emotionNum,
              question: getEmotionQuestion(emotionNum),
              answer: answer,
            };
          }
          return null;
        })
        .filter((item): item is SavedAnswer => item !== null);

      setSavedAnswers(filteredAnswers);
      setIsLetterModalOpen(true);
    }
  };

  return (
    <>
      <div className={`bg-base ${getBackgroundClass(selectedEmotion)} min-h-screen`}>
        <Header />
        <div className="mt-[206px] ml-[160px] flex flex-col">
          {username && selectedEmotion && (
            <>
              <p className="subtitle-40 text-white">{username}님의</p>
              <p className="heading-72 text-white">{ISLAND_NAMES[selectedEmotion] || '섬'}</p>
              {(() => {
                const description = getIslandDescription(selectedEmotion);
                if (description) {
                  const hasBrTag = description.includes('<br/>');
                  return hasBrTag ? (
                    <p
                      className="subtitle-40 text-white"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  ) : (
                    <p className="subtitle-40 text-white">{description}</p>
                  );
                }
                return null;
              })()}
            </>
          )}
        </div>
        {/* letter.svg 버튼 */}
        <button
          onClick={handleLetterClick}
          className="absolute right-[100px] bottom-[100px] cursor-pointer"
        >
          <Image src="/icons/letter.svg" alt="letter" width={100} height={100} />
        </button>
      </div>

      {/* 저장된 답변 모달 */}
      {isLetterModalOpen && selectedEmotion && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setIsLetterModalOpen(false)}
        >
          <div className="pointer-events-none absolute inset-0 top-[400px] flex items-center justify-center">
            <LetterModalFrame
              style={{
                width: '90vw',
                maxWidth: '1621px',
                height: '85vh',
                maxHeight: '1200px',
              }}
            />
          </div>
          <div
            className="relative z-10 mt-[400px] ml-[400px] flex flex-col overflow-visible"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90vw',
              maxWidth: '1621px',
              height: '85vh',
              maxHeight: '900px',
            }}
          >
            <div className="-mt-[100px] ml-[60px] flex flex-1 flex-col gap-[45px] overflow-y-auto">
              {savedAnswers.length > 0 ? (
                savedAnswers.map((item, index) => (
                  <div key={item.emotionNumber} className="mt-15 flex w-full flex-col gap-[40px]">
                    <p className="instruction-32 mb-[66px] flex text-white">
                      From. {selectedEmotion ? ISLAND_NAMES[selectedEmotion] : ''}
                    </p>
                    <div className="flex flex-col gap-[167px]">
                      <div className="flex flex-col">
                        <p className="heading-28-semibold flex gap-[37px] text-white">
                          <span className="display-96">Q</span>
                          <span
                            className="mt-[20px] flex"
                            dangerouslySetInnerHTML={{ __html: item.question }}
                          />
                        </p>
                      </div>
                      <div className="flex gap-[42px]">
                        <p className="text-white">
                          <span className="display-96">A</span>
                        </p>
                        <div className="text-white">
                          <span className="heading-28-semibold mt-[20px] flex">{item.answer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-15 flex w-full max-w-2xl flex-col gap-[40px]">
                  <p className="body-18 px-[32px] text-white">저장된 답변이 없습니다.</p>
                </div>
              )}
            </div>

            {/* 비디오 - 오른쪽 상단 */}
            {selectedEmotion && (
              <video
                src={`${VIDEO_BASE_URL}/big-emotion${selectedEmotion}.webm`}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 right-[400px] z-20 h-[500px] w-[500px] object-contain"
              />
            )}

            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsLetterModalOpen(false)}
              className="absolute -top-30 -left-8 z-20"
              aria-label="닫기"
            >
              <Image src="/icons/close.svg" alt="close" width={24} height={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
