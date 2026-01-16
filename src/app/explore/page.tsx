'use client';

import { useState, useRef, useEffect } from 'react';
import { useModal } from '@/contexts/ModalContext';

const Page = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scaleRatio, setScaleRatio] = useState(1);
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 });
  const [isMounted, setIsMounted] = useState(false);
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(null);
  const [selectedIconPosition, setSelectedIconPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { openModal, isOpen } = useModal();

  useEffect(() => {
    if (!isOpen) {
      setSelectedIconIndex(null);
      setSelectedIconPosition(null);
    }
  }, [isOpen]);

  const SVG_WIDTH = 5760;
  const SVG_HEIGHT = 2430;
  const SVG_ASPECT_RATIO = SVG_WIDTH / SVG_HEIGHT;

  const getPositionBounds = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const imageDisplayWidth = screenHeight * SVG_ASPECT_RATIO;

    if (imageDisplayWidth <= screenWidth) {
      return { min: 0, max: 0 };
    }
    const minX = screenWidth / 2 - imageDisplayWidth / 2;
    const maxX = -screenWidth / 2 + imageDisplayWidth / 2;

    return { min: minX, max: maxX };
  };

  const clampPosition = (x: number) => {
    const bounds = getPositionBounds();
    return Math.max(bounds.min, Math.min(bounds.max, x));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    setPosition({ x: clampPosition(newX), y: 0 });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsDragging(true);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const centerX = (touch1.clientX + touch2.clientX) / 2;
      setDragStart({
        x: centerX - position.x,
        y: 0,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 2) return;
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const centerX = (touch1.clientX + touch2.clientX) / 2;
    const newX = centerX - dragStart.x;
    setPosition({ x: clampPosition(newX), y: 0 });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        setPosition({ x: clampPosition(newX), y: 0 });
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  useEffect(() => {
    setIsMounted(true);

    const updateScaleRatio = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      setScreenSize({ width: screenWidth, height: screenHeight });
      setScaleRatio(screenHeight / SVG_HEIGHT);
    };

    const handleResize = () => {
      updateScaleRatio();
      setPosition((prev) => ({ x: clampPosition(prev.x), y: 0 }));
    };

    updateScaleRatio();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-explore relative h-screen w-screen overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundPosition:
          position.x === 0 ? 'center center' : `calc(50% + ${position.x}px) center`,
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle 146px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0, 0, 0, 0.8) 100%)`,
          pointerEvents: 'none',
          zIndex: 1,
          opacity: isOpen ? 0.8 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
      {selectedIconPosition && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle 200px at ${selectedIconPosition.x}px ${selectedIconPosition.y}px, transparent 0%, rgba(0, 0, 0, 0) 100%)`,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}
      {isMounted &&
        (() => {
          const imageDisplayWidth = screenSize.height * SVG_ASPECT_RATIO;
          const imageOffsetX = position.x;

          const iconPositions = [
            { top: 370, x: SVG_WIDTH - 2170, width: 150, height: 50 }, // emotion1
            { top: 440, x: SVG_WIDTH - 190, width: 50, height: 148 }, // emotion2
            { top: 650, x: 122, width: 100, height: 50 }, // emotion3
            { top: 800, x: 1400, width: 100, height: 50 }, // emotion4
            { top: 770, x: SVG_WIDTH - 650, width: 130, height: 157 }, // emotion5
            { top: 1095, x: 585, width: 90, height: 50 }, //emotion6
            { top: 1000, x: 2038, width: 120, height: 50 }, //emotion7
            { top: 950, x: 3460, width: 170, height: 150 }, //emotion8
            { top: 1250, x: 140, width: 100, height: 50 }, //emotion9
            { top: 1370, x: 4790, width: 90, height: 50 }, //emotion10
            { top: 1650, x: 670, width: 100, height: 50 }, //emotion11
            { top: 1800, x: 2231, width: 130, height: 50 }, //emotion12
            { top: 2050, x: 3280, width: 80, height: 50 }, //emotion13
            { top: 1830, x: 4360, width: 100, height: 50 }, //emotion14
            { top: 2080, x: 4900, width: 80, height: 50 }, //emotion15
          ];

          return iconPositions.map((iconPos, index) => {
            const scaledTop = iconPos.top * scaleRatio;
            const scaledX = iconPos.x * scaleRatio;

            const imageCenterX = screenSize.width / 2 + imageOffsetX;
            const iconScreenX = imageCenterX - imageDisplayWidth / 2 + scaledX;

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: `${scaledTop}px`,
                  left: `${iconScreenX}px`,
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // 클릭된 아이콘의 화면 위치 저장
                  const rect = e.currentTarget.getBoundingClientRect();
                  setSelectedIconIndex(index);
                  setSelectedIconPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                  });
                  openModal(<div />, index);
                }}
              >
                <img
                  src={`/icons/emotion${index + 1}.svg`}
                  alt={`emotion${index + 1}`}
                  width={iconPos.width}
                  height={iconPos.height}
                />
              </div>
            );
          });
        })()}
    </div>
  );
};

export default Page;
