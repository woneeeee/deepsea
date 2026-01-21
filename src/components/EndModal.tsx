'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface EndModalProps {
  isOpen: boolean;
  onContinue: () => void;
  onEnd: () => void;
}

export default function EndModal({ isOpen, onContinue, onEnd }: EndModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleEnd = () => {
    onEnd();
    router.push('/end');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" onClick={onContinue}>
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
        <p className="subtitle-24m text-center text-white">탐색을 종료할까요?</p>

        {/* Buttons */}
        <div className="flex items-center gap-[32px]">
          {/* Continue Button */}
          <button onClick={onContinue}>
            <Image src="/icons/continue.svg" alt="continue" width={140} height={42} />
          </button>

          {/* End Button */}
          <button onClick={handleEnd}>
            <Image src="/icons/stop.svg" alt="stop" width={140} height={42} />
          </button>
        </div>
      </div>
    </div>
  );
}
