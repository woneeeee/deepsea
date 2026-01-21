'use client';

import React from 'react';

interface MiddleModalFrameProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function MiddleModalFrame({
  width = 1588,
  height = 1120,
  className = '',
  style,
}: MiddleModalFrameProps) {
  // 고유 ID 생성 (여러 인스턴스가 있을 경우 충돌 방지)
  const uniqueId = React.useMemo(() => Math.random().toString(36).substr(2, 9), []);
  const filterId = `filter0_d_${uniqueId}`;
  const maskId = `path-1-inside-1_${uniqueId}`;
  const clipPathId = `bgblur_0_${uniqueId}_clip_path`;
  const paint0Id = `paint0_linear_${uniqueId}`;
  const paint1Id = `paint1_linear_${uniqueId}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1588 1120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <foreignObject x="0" y="0" width="1588" height="1120">
        <div
          style={{
            backdropFilter: 'blur(50px)',
            clipPath: `url(#${clipPathId})`,
            height: '100%',
            width: '100%',
          }}
        />
      </foreignObject>
      <g filter={`url(#${filterId})`} data-figma-bg-blur-radius="100">
        <mask id={maskId} fill="white">
          <path d="M1468 100C1479.05 100 1488 108.954 1488 120V1000C1488 1011.05 1479.25 1020 1468.2 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1468ZM155 192C143.954 192 135 200.954 135 212V713C135 724.046 143.954 733 155 733H656C667.046 733 676 724.046 676 713V212C676 200.954 667.046 192 656 192H155Z" />
        </mask>
        <path
          d="M1468 100C1479.05 100 1488 108.954 1488 120V1000C1488 1011.05 1479.25 1020 1468.2 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1468ZM155 192C143.954 192 135 200.954 135 212V713C135 724.046 143.954 733 155 733H656C667.046 733 676 724.046 676 713V212C676 200.954 667.046 192 656 192H155Z"
          fill={`url(#${paint0Id})`}
          fillOpacity="0.2"
          shapeRendering="crispEdges"
        />
        <path
          d="M1468 100V99V99V100ZM1488 120H1489V120H1488ZM1468.2 1020V1021V1021V1020ZM120 1020L120 1021H120V1020ZM100 1000H99V1000H100ZM155 192V191V191V192ZM135 212H134V212H135ZM135 713H134V713H135ZM155 733V734V734V733ZM656 733V734V734V733ZM676 713H677V713H676ZM676 212H677V212H676ZM656 192V191V191V192ZM1468 100V101C1478.49 101 1487 109.507 1487 120H1488H1489C1489 108.402 1479.6 99 1468 99V100ZM1488 120H1487V1000H1488H1489V120H1488ZM1488 1000H1487C1487 1010.51 1478.68 1019 1468.2 1019V1020V1021C1479.82 1021 1489 1011.58 1489 1000H1488ZM1468.2 1020V1019H120V1020V1021H1468.2V1020ZM120 1020L120 1019C109.507 1019 101 1010.49 101 1000H100H99C99 1011.6 108.402 1021 120 1021L120 1020ZM100 1000H101V120H100H99V1000H100ZM100 120H101C101 109.507 109.507 101 120 101V100V99C108.402 99 99 108.402 99 120H100ZM120 100V101H1468V100V99H120V100ZM155 192V191C143.402 191 134 200.402 134 212H135H136C136 201.507 144.507 193 155 193V192ZM135 212H134V713H135H136V212H135ZM135 713H134C134 724.598 143.402 734 155 734V733V732C144.507 732 136 723.493 136 713H135ZM155 733V734H656V733V732H155V733ZM656 733V734C667.598 734 677 724.598 677 713H676H675C675 723.493 666.493 732 656 732V733ZM676 713H677V212H676H675V713H676ZM676 212H677C677 200.402 667.598 191 656 191V192V193C666.493 193 675 201.507 675 212H676ZM656 192V191H155V192V193H656V192Z"
          fill={`url(#${paint1Id})`}
          mask={`url(#${maskId})`}
        />
      </g>
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="1588"
          height="1120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="50" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.313726 0 0 0 0 0.752941 0 0 0 0.6 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_916_52382" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_916_52382"
            result="shape"
          />
        </filter>
        <clipPath id={clipPathId} transform="translate(0 0)">
          <path d="M1468 100C1479.05 100 1488 108.954 1488 120V1000C1488 1011.05 1479.25 1020 1468.2 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1468ZM155 192C143.954 192 135 200.954 135 212V713C135 724.046 143.954 733 155 733H656C667.046 733 676 724.046 676 713V212C676 200.954 667.046 192 656 192H155Z" />
        </clipPath>
        <linearGradient
          id={paint0Id}
          x1="794"
          y1="100"
          x2="794"
          y2="1020"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6EDF9" />
          <stop offset="1" stopColor="#E5EDF9" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={paint1Id}
          x1="123.5"
          y1="100"
          x2="1474"
          y2="1020"
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
