'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

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
  }, []);

  return (
    //화면 전체 확인
    <div
      onClick={() => router.push('/explore')}
      className="flex w-full cursor-pointer flex-col items-center justify-center gap-3"
    >
      <p className="seogang-36 mt-[256px] w-[708px] p-[12px] text-[#00A4C3]">
        {username ? `${username}님, 반갑습니다` : '반갑습니다'}
        <br />
        감정의 바다 속에서 나만의 보물을 찾아보세요
      </p>
    </div>
  );
};

export default Page;
