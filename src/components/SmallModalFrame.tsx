'use client';

import React from 'react';

interface SmallModalFrameProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SmallModalFrame({
  width = 1379,
  height = 1120,
  className = '',
  style,
}: SmallModalFrameProps) {
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
      viewBox="0 0 1379 1120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <foreignObject x="0" y="0" width="1379" height="1120">
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
          <path d="M1259 100C1270.05 100 1279 108.954 1279 120V901.999C1279 917.481 1258.48 928 1243 928C1212.07 928 1187 953.072 1187 984C1187 999.482 1176.48 1020 1161 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1259ZM155 192C143.954 192 135 200.954 135 212V956C135 967.046 143.954 976 155 976H560C571.046 976 580 967.046 580 956V212C580 200.954 571.046 192 560 192H155Z" />
        </mask>
        <path
          d="M1259 100C1270.05 100 1279 108.954 1279 120V901.999C1279 917.481 1258.48 928 1243 928C1212.07 928 1187 953.072 1187 984C1187 999.482 1176.48 1020 1161 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1259ZM155 192C143.954 192 135 200.954 135 212V956C135 967.046 143.954 976 155 976H560C571.046 976 580 967.046 580 956V212C580 200.954 571.046 192 560 192H155Z"
          fill={`url(#${paint0Id})`}
          fillOpacity="0.2"
          shapeRendering="crispEdges"
        />
        <path
          d="M1259 100V99V99V100ZM1279 120H1280V120H1279ZM120 1020L120 1021H120V1020ZM100 1000H99V1000H100ZM155 192V191V192ZM135 956H134V956H135ZM560 976V977V976ZM580 212H581V212H580ZM560 192V191V192ZM1259 100V101C1269.49 101 1278 109.507 1278 120H1279H1280C1280 108.402 1270.6 99 1259 99V100ZM1279 120H1278V901.999H1279H1280V120H1279ZM1279 901.999H1278C1278 909.261 1273.18 915.493 1266.26 919.965C1259.36 924.429 1250.54 927 1243 927V928V929C1250.94 929 1260.13 926.312 1267.35 921.645C1274.56 916.988 1280 910.219 1280 901.999H1279ZM1243 928V927C1211.52 927 1186 952.52 1186 984H1187H1188C1188 953.624 1212.62 929 1243 929V928ZM1187 984H1186C1186 991.543 1183.43 1000.36 1178.97 1007.26C1174.49 1014.18 1168.26 1019 1161 1019V1020V1021C1169.22 1021 1175.99 1015.56 1180.65 1008.35C1185.31 1001.13 1188 991.939 1188 984H1187ZM1161 1020V1019H120V1020V1021H1161V1020ZM120 1020L120 1019C109.507 1019 101 1010.49 101 1000H100H99C99 1011.6 108.402 1021 120 1021L120 1020ZM100 1000H101V120H100H99V1000H100ZM100 120H101C101 109.507 109.507 101 120 101V100V99C108.402 99 99 108.402 99 120H100ZM120 100V101H1259V100V99H120V100ZM155 192V191C143.402 191 134 200.402 134 212H135H136C136 201.507 144.507 193 155 193V192ZM135 212H134V956H135H136V212H135ZM135 956H134C134 967.598 143.402 977 155 977V976V975C144.507 975 136 966.493 136 956H135ZM155 976V977H560V976V975H155V976ZM560 976V977C571.598 977 581 967.598 581 956H580H579C579 966.493 570.493 975 560 975V976ZM580 956H581V212H580H579V956H580ZM580 212H581C581 200.402 571.598 191 560 191V192V193C570.493 193 579 201.507 579 212H580ZM560 192V191H155V192V193H560V192Z"
          fill={`url(#${paint1Id})`}
          mask={`url(#${maskId})`}
        />
      </g>
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="1379"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_791_9413" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_791_9413"
            result="shape"
          />
        </filter>
        <clipPath id={clipPathId} transform="translate(0 0)">
          <path d="M1259 100C1270.05 100 1279 108.954 1279 120V901.999C1279 917.481 1258.48 928 1243 928C1212.07 928 1187 953.072 1187 984C1187 999.482 1176.48 1020 1161 1020H120C108.954 1020 100 1011.05 100 1000V120C100 108.954 108.954 100 120 100H1259ZM155 192C143.954 192 135 200.954 135 212V956C135 967.046 143.954 976 155 976H560C571.046 976 580 967.046 580 956V212C580 200.954 571.046 192 560 192H155Z" />
        </clipPath>
        <linearGradient
          id={paint0Id}
          x1="689.5"
          y1="100"
          x2="689.5"
          y2="1020"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6EDF9" />
          <stop offset="1" stopColor="#E5EDF9" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id={paint1Id}
          x1="119.961"
          y1="100"
          x2="1378.17"
          y2="828.066"
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
