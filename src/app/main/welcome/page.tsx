'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [scrollStage, setScrollStage] = useState(0);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [screenHeight, setScreenHeight] = useState(1080);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8080/user');

        if (!res.ok) {
          throw new Error('사용자 없음');
        }

        const data = await res.json();
        setUsername(data.username);
      } catch (error) {
        console.error(error);
        setUsername(null);
      }
    };

    fetchUser();

    // 화면 높이 설정
    setScreenHeight(window.innerHeight);
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (scrollStage === 0) {
      setScrollStage(1);
      // 배경이 아래로 스크롤되면서 바닷속으로 내려가는 애니메이션
      const startTime = Date.now();
      const duration = 6000; // 4초 동안 스크롤

      // 이미지 높이 계산
      // main-screen.svg가 세로로 길기 때문에, 배경이 위로 올라가면서 아래쪽 부분이 보이도록 함
      const imageAspectRatio = 3;
      const imageTotalHeight = screenHeight * imageAspectRatio;
      const maxScroll = imageTotalHeight - screenHeight; // 이미지 끝까지 스크롤

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out 효과
        setBackgroundPosition(easeProgress * maxScroll);

        // 배경 이미지가 끝나기 전에 explore 화면이 아래에서 위로 올라오도록
        if (progress >= 0.2) {
          setScrollStage(2);
          // explore 화면이 올라온 후 실제 페이지로 이동
          setTimeout(() => {
            router.push('/explore');
          }, 500);
        } else if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Main Screen Background */}
      <div
        className="bg-base bg-main fixed inset-0"
        style={{
          backgroundPosition: `center top`,
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: `${screenHeight * 3}px`, // 이미지 전체 높이를 더 크게
          minHeight: '100vh',
          transform: `translateY(-${backgroundPosition}px)`,
          transition: scrollStage === 0 ? 'transform 0.1s linear' : 'none',
        }}
      />

      {/* Welcome Page */}
      <div
        className={`fixed inset-0 flex min-h-screen w-full cursor-pointer flex-col items-center gap-3 transition-transform duration-700 ease-in-out ${
          scrollStage >= 1 ? '-translate-y-full' : 'translate-y-0'
        }`}
        onClick={handleClick}
      >
        <p className="seogang-36 mt-[350px] w-[708px] p-[12px] text-[#00A4C3]">
          {username ? `${username}님, 반갑습니다` : '반갑습니다'}
          <br />
          감정의 바다 속에서 나만의 보물을 찾아보세요
        </p>
      </div>

      {/* Explore Page Preview - 아래에서 위로 올라옴 */}
      <div
        className={`bg-explore fixed inset-0 min-h-screen transition-transform duration-800 ${
          scrollStage <= 1 ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{
          backgroundPosition: 'center center',
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Page;
