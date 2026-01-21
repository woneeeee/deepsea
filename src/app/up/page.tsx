'use client';

import { useState, useEffect } from 'react';

export default function UpPage() {
  const [scrollStage, setScrollStage] = useState(0); // 0: up1, 1: up2 보임, 2: up3 보임

  useEffect(() => {
    // 자동으로 순차적으로 올라가도록
    const timer1 = setTimeout(() => {
      setScrollStage(1);
    }, 2000);

    const timer2 = setTimeout(() => {
      setScrollStage(2);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="bg-base relative min-h-screen overflow-hidden">
      {/* Up 1 Page */}
      <div
        className={`bg-base bg-up1 fixed inset-0 min-h-screen transition-transform duration-2000 ${
          scrollStage >= 1 ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Up 2 Page */}
      <div
        className={`bg-base bg-up2 fixed inset-0 min-h-screen transition-transform duration-2000 ${
          scrollStage === 0
            ? '-translate-y-full'
            : scrollStage === 1
              ? 'translate-y-0'
              : 'translate-y-full'
        }`}
      />

      {/* Up 3 Page */}
      <div
        className={`bg-base bg-up3 fixed inset-0 min-h-screen transition-transform duration-2000 ${
          scrollStage <= 1 ? '-translate-y-full' : 'translate-y-0'
        }`}
      />
    </div>
  );
}
