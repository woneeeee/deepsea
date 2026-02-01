'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/constants/emotionTexts';

const UP_EMOTION_BG_CLASS: Record<number, string> = {
  1: 'bg-up-emotion-1',
  5: 'bg-up-emotion-5',
  7: 'bg-up-emotion-7',
  8: 'bg-up-emotion-8',
  9: 'bg-up-emotion-9',
};

const LONG_BG_HEIGHT = 3;

const LINES = [
  '바닷속 깊이 잠겨 있던 감정을 찾아냈어요',
  '선택한 보물은 앞으로 당신을 지켜줄 소중한 빛이 될 거예요.',
  '',
];

const SCROLL_START_DELAY_MS = 600;
const SCROLL_DURATION_MS = 9000;
const NAVIGATE_AFTER_MS = SCROLL_START_DELAY_MS + SCROLL_DURATION_MS + 200;

export default function UpPage() {
  const router = useRouter();
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedEmotion');
    if (stored) {
      const num = parseInt(stored, 10);
      if ([1, 5, 7, 8, 9].includes(num)) setSelectedEmotion(num);
    }
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user`, { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || null);
        }
      } catch {
        setUsername(null);
      }
    };
    fetchUsername();
  }, []);

  const bgClass = selectedEmotion ? UP_EMOTION_BG_CLASS[selectedEmotion] : null;

  useEffect(() => {
    const tStart = setTimeout(() => setHasScrolledUp(true), SCROLL_START_DELAY_MS);
    const tNavigate = setTimeout(() => router.push('/island'), NAVIGATE_AFTER_MS);
    return () => {
      clearTimeout(tStart);
      clearTimeout(tNavigate);
    };
  }, [router]);

  const containerHeight = `${LONG_BG_HEIGHT * 100}vh`;
  const initialOffsetY = `${(LONG_BG_HEIGHT - 1) * 100}vh`;

  const line3 = username
    ? `이제, 그 빛을 따라 ${username}님의 섬으로 향합니다.`
    : '이제, 그 빛을 따라 당신의 섬으로 향합니다.';

  return (
    <div className="bg-base relative min-h-screen overflow-hidden">
      {/* 배경: 멈춤 없이 한 번에 위로 스크롤 */}
      <div
        className={`bg-base ${bgClass || 'bg-up1'} fixed top-0 left-0 w-full bg-[length:100%_auto] bg-[position:center_top] bg-no-repeat`}
        style={{
          height: containerHeight,
          transition: `transform ${SCROLL_DURATION_MS}ms ease-out`,
          transform: hasScrolledUp ? 'translateY(0)' : `translateY(-${initialOffsetY})`,
        }}
      />

      {/* 텍스트: 배경과 같이 한 번에 위로 올라감 (화면만 올라가고 글자는 그대로) */}
      <div
        className="pointer-events-none fixed top-0 left-0 flex w-full flex-col"
        style={{
          height: containerHeight,
          transition: `transform ${SCROLL_DURATION_MS}ms ease-out`,
          transform: hasScrolledUp ? 'translateY(0)' : `translateY(-${initialOffsetY})`,
        }}
      >
        {/* 아래→위 스크롤 시 1줄→2줄→3줄 순으로 보이도록 역순 배치 (컨테이너 상단=line3, 하단=line1) */}
        {[line3, LINES[1], LINES[0]].map((text, index) => (
          <section
            key={index}
            className="flex min-h-screen w-full flex-shrink-0 items-center justify-center px-6"
          >
            <p className="seogang-32 text-center text-white md:text-4xl">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
