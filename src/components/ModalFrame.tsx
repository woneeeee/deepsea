'use client';

import React from 'react';

interface ModalFrameProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ModalFrame({
  width = 1588,
  height = 1120,
  className = '',
  style,
}: ModalFrameProps) {
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
          <path d="M1468 100C1479.05 100 1488 108.954 1488 120V901.999C1488 917.481 1467.48 928 1452 928C1421.07 928 1396 953.072 1396 984C1396 999.482 1385.48 1020 1370 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1468ZM155 192C143.954 192 135 200.954 135 212V956C135 967.046 143.954 976 155 976H656C667.046 976 676 967.046 676 956V212C676 200.954 667.046 192 656 192H155Z" />
        </mask>
        <path
          d="M1468 100C1479.05 100 1488 108.954 1488 120V901.999C1488 917.481 1467.48 928 1452 928C1421.07 928 1396 953.072 1396 984C1396 999.482 1385.48 1020 1370 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1468ZM155 192C143.954 192 135 200.954 135 212V956C135 967.046 143.954 976 155 976H656C667.046 976 676 967.046 676 956V212C676 200.954 667.046 192 656 192H155Z"
          fill={`url(#${paint0Id})`}
          fillOpacity="0.2"
          shapeRendering="crispEdges"
        />
        <path
          d="M1468 100V99V99V100ZM1488 120H1489V120H1488ZM120 1020L120 1021H120V1020ZM100 1000H99V1000H100ZM155 192V191V191V192ZM135 956H134V956H135ZM155 976V977V977V976ZM656 976V977V977V976ZM676 212H677V212H676ZM656 192V191V191V192ZM1468 100V101C1478.49 101 1487 109.507 1487 120H1488H1489C1489 108.402 1479.6 99 1468 99V100ZM1488 120H1487V901.999H1488H1489V120H1488ZM1488 901.999H1487C1487 909.261 1482.18 915.493 1475.26 919.965C1468.36 924.429 1459.54 927 1452 927V928V929C1459.94 929 1469.13 926.312 1476.35 921.645C1483.56 916.988 1489 910.219 1489 901.999H1488ZM1452 928V927C1420.52 927 1395 952.52 1395 984H1396H1397C1397 953.624 1421.62 929 1452 929V928ZM1396 984H1395C1395 991.543 1392.43 1000.36 1387.97 1007.26C1383.49 1014.18 1377.26 1019 1370 1019V1020V1021C1378.22 1021 1384.99 1015.56 1389.65 1008.35C1394.31 1001.13 1397 991.939 1397 984H1396ZM1370 1020V1019H120V1020V1021H1370V1020ZM120 1020L120 1019C109.507 1019 101 1010.49 101 1000H100H99C99 1011.6 108.402 1021 120 1021L120 1020ZM100 1000H101V120H100H99V1000H100ZM100 120H101C101 109.507 109.507 101 120 101V100V99C108.402 99 99 108.402 99 120H100ZM120 100V101H1468V100V99H120V100ZM155 192V191C143.402 191 134 200.402 134 212H135H136C136 201.507 144.507 193 155 193V192ZM135 212H134V956H135H136V212H135ZM135 956H134C134 967.598 143.402 977 155 977V976V975C144.507 975 136 966.493 136 956H135ZM155 976V977H656V976V975H155V976ZM656 976V977C667.598 977 677 967.598 677 956H676H675C675 966.493 666.493 975 656 975V976ZM676 956H677V212H676H675V956H676ZM676 212H677C677 200.402 667.598 191 656 191V192V193C666.493 193 675 201.507 675 212H676ZM656 192V191H155V192V193H656V192Z"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_916_46868" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_916_46868"
            result="shape"
          />
        </filter>
        <clipPath id={clipPathId} transform="translate(0 0)">
          <path d="M1468 100C1479.05 100 1488 108.954 1488 120V901.999C1488 917.481 1467.48 928 1452 928C1421.07 928 1396 953.072 1396 984C1396 999.482 1385.48 1020 1370 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1468ZM155 192C143.954 192 135 200.954 135 212V956C135 967.046 143.954 976 155 976H656C667.046 976 676 967.046 676 956V212C676 200.954 667.046 192 656 192H155Z" />
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
