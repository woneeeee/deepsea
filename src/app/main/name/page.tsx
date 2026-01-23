'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/constants/emotionTexts';

const Page = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const saveUsername = async () => {
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: inputValue,
      }),
    });

    const data = await res.json();
    console.log(data);
    router.push('/main/welcome');
  };

  return (
    <div className="bg-base bg-main flex w-full cursor-pointer flex-col items-center gap-3">
      <p className="seogang-36 mt-[400px] w-[379px] p-[12px] text-[#00A4C3]">
        닉네임을 입력해 주세요
      </p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="text-primary-300 caption-14 h-[50px] w-[384px] rounded-[12px] bg-[#E5EDF9]/30 px-[18px] py-[12px] shadow-[0_4px_30px_0_rgba(0,176,192,0.2)]"
        placeholder="2자 이상 입력해 주세요."
      />
      <Button
        className={`pretendard-body-18 mt-[130px] h-[44px] w-[161px] items-center justify-center rounded-[50px] bg-[#E5EDF9]/30 p-[10px] text-center shadow-[0_4px_30px_0_rgba(0,176,192,0.2)] hover:bg-[#BBE7EF99] hover:text-[#00A4C3] active:bg-[#00A4C399] ${
          inputValue.trim() ? 'text-[#00A4C3]' : 'text-primary-200'
        }`}
        onClick={saveUsername}
      >
        탐험 하러 가기
      </Button>
    </div>
  );
};

export default Page;
