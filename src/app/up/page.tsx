'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { VIDEO_BASE_URL } from '@/constants/emotionTexts';

// 메인 감정별 연관(서브) 감정 — 유리병 답변 개수 계산용 (island와 동일)
const EMOTION_GROUPS: Record<number, number[]> = {
  1: [10, 14],
  5: [11, 15],
  7: [2, 3],
  8: [6, 12],
  9: [4, 13],
};

export default function UpPage() {
  const router = useRouter();
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedEmotion');
    if (stored) {
      const num = parseInt(stored, 10);
      if ([1, 5, 7, 8, 9].includes(num)) setSelectedEmotion(num);
    }
  }, []);

  // 연관 감정에 적은 유리병(답변) 개수: 0, 1, 2
  const bottleCount = useMemo(() => {
    if (!selectedEmotion) return 0;
    const subEmotions = EMOTION_GROUPS[selectedEmotion] || [];
    try {
      const answers = JSON.parse(localStorage.getItem('emotionAnswers') || '{}');
      return subEmotions.filter((em) => answers[em]).length;
    } catch {
      return 0;
    }
  }, [selectedEmotion]);

  const videoSrc =
    selectedEmotion != null
      ? `${VIDEO_BASE_URL}/up-${selectedEmotion}-${bottleCount}.webm`
      : `${VIDEO_BASE_URL}/up-1-0.webm`;

  return (
    <div className="bg-base relative min-h-screen overflow-hidden">
      <div className="fixed top-0 left-0 h-screen w-full">
        <video
          src={videoSrc}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-contain object-top"
          onEnded={() => router.push('/island')}
        />
      </div>
    </div>
  );
}
