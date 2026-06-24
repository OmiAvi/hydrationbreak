"use client";

import { MAP_HEIGHT, MAP_WIDTH, type ProjectedPoint } from "@/lib/map";
import { worldLandPaths } from "@/lib/world-map-land-paths";

type ProjectedWorldMapProps = {
  className?: string;
  guess?: ProjectedPoint | null;
  actual?: ProjectedPoint | null;
  interactive?: boolean;
  onSelect?: (point: ProjectedPoint) => void;
};

function Marker({
  point,
  fill,
  stroke,
  label,
}: {
  point: ProjectedPoint;
  fill: string;
  stroke: string;
  label?: string;
}) {
  return (
    <g transform={`translate(${point.x}, ${point.y})`}>
      <circle r="28" fill={fill} opacity="0.18" />
      <circle r="17" fill={fill} stroke="white" strokeWidth="6" />
      <circle r="6" fill="white" stroke={stroke} strokeWidth="3" />
      {label ? (
        <text
          x="0"
          y="-34"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill={stroke}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export function ProjectedWorldMap({
  className,
  guess,
  actual,
  interactive = false,
  onSelect,
}: ProjectedWorldMapProps) {
  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || !onSelect) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * MAP_WIDTH;
    const y = ((event.clientY - rect.top) / rect.height) * MAP_HEIGHT;
    onSelect({ x, y });
  };

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className={className}
      onClick={handleClick}
      role={interactive ? "button" : "img"}
      aria-label="Projected world map"
    >
      <defs>
        <linearGradient id="ocean" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#b6def2" />
          <stop offset="55%" stopColor="#9dcee7" />
          <stop offset="100%" stopColor="#79b6d4" />
        </linearGradient>
        <linearGradient id="land" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#89c996" />
          <stop offset="52%" stopColor="#6cb781" />
          <stop offset="100%" stopColor="#4c9362" />
        </linearGradient>
        <filter id="landShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#2b6b4f" floodOpacity="0.16" />
        </filter>
        <radialGradient id="polarGlow" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <rect width={MAP_WIDTH} height={MAP_HEIGHT} rx="36" fill="url(#ocean)" />
      <rect width={MAP_WIDTH} height={MAP_HEIGHT} rx="36" fill="url(#polarGlow)" opacity="0.45" />

      <path
        d="M0 74C138 98 226 82 338 58 460 32 578 42 670 58 764 74 882 112 1000 104V0H0Z"
        fill="rgba(255,255,255,0.18)"
      />
      <path
        d="M0 420C92 398 210 388 332 402 454 416 586 446 676 442 794 436 902 408 1000 380V520H0Z"
        fill="rgba(66,123,145,0.18)"
      />

      {Array.from({ length: 11 }).map((_, index) => {
        const y = (index / 10) * MAP_HEIGHT;
        return (
          <line
            key={`lat-${index}`}
            x1="0"
            x2={MAP_WIDTH}
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="2"
          />
        );
      })}

      {Array.from({ length: 13 }).map((_, index) => {
        const x = (index / 12) * MAP_WIDTH;
        return (
          <line
            key={`lon-${index}`}
            x1={x}
            x2={x}
            y1="0"
            y2={MAP_HEIGHT}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="2"
          />
        );
      })}

      <path
        d="M72 120C180 146 256 150 342 124 410 104 488 96 604 112 706 126 804 160 922 144"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M54 242C154 266 226 272 330 250 430 226 560 210 684 236 782 256 868 286 942 274"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M62 354C184 338 288 344 388 364 510 388 620 410 742 398 828 390 892 364 956 350"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <g filter="url(#landShadow)">
        {worldLandPaths.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="url(#land)"
            fillRule="evenodd"
            stroke="#d9efde"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {guess && actual ? (
        <line
          x1={guess.x}
          y1={guess.y}
          x2={actual.x}
          y2={actual.y}
          stroke="#facc15"
          strokeWidth="6"
          strokeDasharray="18 12"
          strokeLinecap="round"
        />
      ) : null}

      {actual ? <Marker point={actual} fill="#facc15" stroke="#18263c" label="X" /> : null}
      {guess ? <Marker point={guess} fill="#ef4444" stroke="#ffffff" /> : null}
    </svg>
  );
}
