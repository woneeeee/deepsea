'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ChooseModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ChooseModal({ isOpen, onConfirm, onCancel }: ChooseModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    router.push('/up');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onCancel}>
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
        <p className="subtitle-24m text-center text-white">선택하신 보물로 확정하시겠습니까?</p>

        {/* Buttons */}
        <div className="flex items-center gap-[32px]">
          {/* Confirm Button */}
          <button onClick={handleConfirm}>
            <Image src="/icons/yes.svg" alt="yes" width={130} height={42} />
          </button>

          {/* Cancel Button */}
          <button onClick={onCancel}>
            <Image src="/icons/no.svg" alt="no" width={130} height={42} />
          </button>
        </div>
      </div>
    </div>
  );
}
