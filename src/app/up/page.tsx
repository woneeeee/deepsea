'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UpPage() {
  const router = useRouter();
  const [scrollStage, setScrollStage] = useState(0); // 0: up1, 1: up2 보임, 2: up3 보임

  useEffect(() => {
    // 자동으로 순차적으로 올라가도록
    const timer1 = setTimeout(() => {
      setScrollStage(1);
    }, 2000);

    const timer2 = setTimeout(() => {
      setScrollStage(2);
    }, 4000);

    // 모든 애니메이션이 완료된 후 /island로 이동 (애니메이션 duration 2000ms 고려)
    const timer3 = setTimeout(() => {
      router.push('/island');
    }, 6000); // 4000ms (scrollStage 2) + 2000ms (애니메이션 duration)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router]);

  return (
    <div className="bg-base relative min-h-screen overflow-hidden">
      <div
        className={`bg-base bg-up1 fixed inset-0 min-h-screen transition-transform duration-2000 ${
          scrollStage >= 1 ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      <div
        className={`bg-base bg-up2 fixed inset-0 min-h-screen transition-transform duration-2000 ${
          scrollStage === 0
            ? '-translate-y-full'
            : scrollStage === 1
              ? 'translate-y-0'
              : 'translate-y-full'
        }`}
      />

      <div
        className={`bg-base bg-up3 fixed inset-0 min-h-screen transition-transform duration-2000 ${
          scrollStage <= 1 ? '-translate-y-full' : 'translate-y-0'
        }`}
      />
    </div>
  );
}
