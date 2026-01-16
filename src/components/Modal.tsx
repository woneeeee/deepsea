'use client';

import { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';

export default function Modal() {
  const { isOpen, content, emotionIndex, closeModal } = useModal();
  const [isSmall, setIsSmall] = useState(false);

  if (!isOpen || emotionIndex === null) return null;

  const handleClose = () => {
    setIsSmall(false);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
      style={{
        backgroundImage: `url(/icons/${isSmall ? 'small-modal' : 'big-modal'}.svg)`,
        backgroundSize: '60%',
        backgroundPosition: isSmall ? 'left center' : 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="relative flex"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '70vw',
          maxWidth: '1200px',
          maxHeight: '80vh',
          overflow: 'visible',
        }}
      >
        {emotionIndex !== null && (
          <div
            className="flex-shrink-0"
            style={{ width: '700px', marginLeft: '-100px', position: 'relative', zIndex: 50 }}
          >
            <img
              src={`/icons/big-emotion${emotionIndex + 1}.svg`}
              alt={`big-emotion${emotionIndex + 1}`}
              className="h-full w-full object-contain"
            />
          </div>
        )}
        {/* 모달 왼쪽 위에 close.svg 표시 */}
        <button
          onClick={handleClose}
          className="absolute top-4 -left-8 z-50"
          aria-label="닫기"
          style={{ cursor: 'pointer' }}
        >
          <img src="/icons/close.svg" alt="close" width={24} height={24} />
        </button>
        <div className="relative flex-1" style={{ overflowY: 'auto' }}>
          <div className="p-6">
            {emotionIndex !== null && (
              <img
                src={`/icons/des-emotion${emotionIndex + 1}.svg`}
                alt={`des-emotion${emotionIndex + 1}`}
                className="h-auto w-full"
              />
            )}
          </div>
          {/* comment 버튼 - des-emotion과 세로 정렬 */}
          <div className="absolute right-3 bottom-3 z-50" style={{ cursor: 'pointer' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSmall(true);
              }}
              className="rounded-full border border-gray-200 bg-[linear-gradient(180deg,rgba(229,237,249,0.2)_0%,rgba(229,237,249,0.02)_100%)] p-[24px]"
            >
              <img src="/icons/comment.svg" alt="comment" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
