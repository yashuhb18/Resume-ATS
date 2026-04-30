'use client';

import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  size?: number;
}

export default function ScoreCircle({ score, size = 120 }: ScoreCircleProps) {
  const [animated, setAnimated] = useState(0);
  const strokeWidth = size * 0.08;
  const radius      = (size - strokeWidth) / 2;
  const circ        = 2 * Math.PI * radius;
  const offset      = circ - (animated / 100) * circ;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 120);
    return () => clearTimeout(t);
  }, [score]);

  const getColor = (s: number) =>
    s >= 80 ? { stroke: 'var(--emerald-neon)', track: 'rgba(52,211,153,0.12)', label: 'var(--emerald-neon)' } :
    s >= 60 ? { stroke: '#fbbf24',             track: 'rgba(251,191,36,0.12)',  label: '#fbbf24'             } :
              { stroke: '#fb7185',             track: 'rgba(251,113,133,0.12)', label: '#fb7185'             };

  const col = getColor(score);

  const gradId = `scoreGrad-${size}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Gradient def */}
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={col.stroke} stopOpacity="0.6" />
            <stop offset="100%" stopColor={col.stroke} />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={col.track} strokeWidth={strokeWidth} />
        {/* Progress */}
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="score-circle"
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.34,1.2,0.64,1)', filter: `drop-shadow(0 0 8px ${col.stroke})` }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold leading-none" style={{ fontSize: size * 0.28, color: col.label, fontFamily: 'Familjen Grotesk, sans-serif' }}>
          {animated}
        </span>
        <span style={{ fontSize: size * 0.1, color: 'var(--text-faint)' }}>/ 100</span>
      </div>
    </div>
  );
}
