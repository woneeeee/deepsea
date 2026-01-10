'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MainPage() {
  const router = useRouter();
  const [isFaded, setIsFaded] = useState(false);

  return (
    <div
      onClick={() => {
        setIsFaded(true);
        setTimeout(() => router.push('/main/name'), 700);
      }}
      className="flex cursor-pointer flex-col items-center justify-center"
    >
      <div
        className={`transition-all duration-700 ${isFaded ? 'opacity-0 blur-md' : 'opacity-100'} `}
      >
        <Image
          src={'icons/main-screen-title.svg'}
          width={326}
          height={309}
          alt="deepsea"
          className="mt-[98px]"
        />
        <p className="subtitle-24m mt-[342px] text-center text-[#127297]">화면을 클릭하세요</p>
        <div className="mt-[111px] flex gap-6">
          <p className="caption-14 text-[#127297]">잠수함 팀</p>
          <Image src={'icons/line.svg'} width={1} height={14} alt="deepsea" />
          <p className="caption-14 text-[#127297]">
            송채연&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 정세윤 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 정윤서
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 황채림 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 김지원
          </p>
        </div>
      </div>
    </div>
  );
}
