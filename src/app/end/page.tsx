'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function EndPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/choose');
  };

  return (
    <div className="bg-base bg-end cursor-pointer" onClick={handleClick}>
      <Header />
      <div className="seogang-32 mt-[1100px] text-center text-white">
        탐험의 마무리 단계입니다
        <br />
        화면 아무 곳이나 선택해주세요
      </div>
    </div>
  );
}
