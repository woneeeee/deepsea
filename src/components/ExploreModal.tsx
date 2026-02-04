'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ExploreModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onEnd: () => void;
}

export default function ExploreModal({ isOpen, onContinue, onEnd }: ExploreModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleEnd = () => {
    onEnd();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onContinue}>
      {/* Modal Content */}
      <div
        className="relative z-10 flex w-[637px] flex-col items-center justify-center gap-[32px] rounded-[20px] border border-white/20 px-[72px] py-[56px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            'linear-gradient(180deg, rgba(229, 237, 249, 0.15) 0%, rgba(229, 237, 249, 0.05) 100%)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Question Text */}
        <p className="subtitle-24m text-center text-white">
          계속 탐색하여 감정 보물을 찾을 수 있어요.
          <br />
          탐색을 다시 시작할까요?
        </p>

        {/* Buttons */}
        <div className="flex items-center">
          {/* End Button */}
          <button onClick={handleEnd}>
            <Image src="/icons/explore-continue.svg" alt="stop" width={140} height={42} />
          </button>
        </div>
      </div>
    </div>
  );
}
