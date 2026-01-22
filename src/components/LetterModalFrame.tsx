'use client';

import React from 'react';

interface LetterModalFrameProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LetterModalFrame({
  width = 1248,
  height = 1115,
  className = '',
  style,
}: LetterModalFrameProps) {
  // 고유 ID 생성 (여러 인스턴스가 있을 경우 충돌 방지)
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  const clipPathId = `bgblur_0_${uniqueId}_clip_path`;
  const paint0Id = `paint0_linear_${uniqueId}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1248 1115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <foreignObject x="-100" y="-100" width="1448" height="1315">
        <div
          style={{
            backdropFilter: 'blur(50px)',
            clipPath: `url(#${clipPathId})`,
            height: '100%',
            width: '100%',
          }}
        />
      </foreignObject>
      <rect
        data-figma-bg-blur-radius="100"
        x="0.5"
        y="0.5"
        width="1247"
        height="1114"
        rx="19.5"
        fill="#001D8D"
        fillOpacity="0.1"
        stroke={`url(#${paint0Id})`}
      />
      <defs>
        <clipPath id={clipPathId} transform="translate(100 100)">
          <rect x="0.5" y="0.5" width="1247" height="1114" rx="19.5" />
        </clipPath>
        <linearGradient
          id={paint0Id}
          x1="21.1297"
          y1="3.05906e-05"
          x2="1437.22"
          y2="715.687"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.01" stopColor="white" />
          <stop offset="0.409316" stopColor="white" stopOpacity="0" />
          <stop offset="0.6" stopColor="white" stopOpacity="0.5" />
          <stop offset="0.8" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.25" />
        </linearGradient>
      </defs>
    </svg>
  );
}
