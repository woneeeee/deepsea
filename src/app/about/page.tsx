'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="bg-base bg-about">
      <Header />
      <div className="mt-[250px] flex h-full w-full items-center justify-center gap-[80px]">
        <div className="flex w-[1013px] flex-col items-start justify-start text-white">
          <div className="seogang-55 flex items-start text-start">About Project</div>
          <div className="body-700 mt-[156px] flex text-start">기획 에피소드</div>
          <p className="body-26 mt-[30px]">
            “교수님 눈치 보지 말고, 우리가 진짜 하고 싶은 걸 해보자”는 생각에서 시작 되었습니다.
            <br />
            학교에서 배우는 형식적인 그래픽 스타일에 지치며, 우리가 좋아하고 추구하는 그래픽을
            <br />
            제한 없이 작품으로 풀고 싶은 마음으로, 만들면서도 즐거운 전시를 하는 것이 목표였습니다.
            <br />
            또한 관객이 작품을 바라보는 데서 그치지 않고, 직접 작품 안으로 들어와 탐색하는 경험을
            <br />
            하길 바랐습니다. 탐색하며 각자의 흐름을 만들어가는 방식이 주제와 잘 어울린다고 생각해
            <br />
            인터랙티브 형식의 전시를 선택했습니다.
          </p>
        </div>
        <div className="mt-[156px] flex flex-col items-start justify-start text-white">
          <p className="body-700 mb-[30px] flex flex-col items-start justify-start">디자인</p>
          <div className="body-26 flex items-center justify-center gap-[36px]">
            <p>정윤서</p>
            <p>송채연</p>
            <p>정세윤</p>
            <p>황채림</p>
          </div>
          <p className="body-700 mt-[90px] mb-[30px] flex flex-col items-start justify-start">
            개발
          </p>
          <div className="body-26 flex items-center justify-center gap-[36px]">
            <p>김지원</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => router.back()}
        className="mt-[137px] flex w-full cursor-pointer items-center justify-center"
      >
        <Image src="/icons/back-screen-button.svg" alt="back" width={257} height={57} />
      </button>
    </div>
  );
}
