interface ProgressRingProps {
  pct: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
  textClassName?: string;
}

export default function ProgressRing({
  pct,
  color,
  size = 44,
  strokeWidth = 4,
  className,
  trackClassName,
  fillClassName,
  textClassName,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <g transform={`rotate(-90 ${center} ${center})`}>
        <circle cx={center} cy={center} r={radius} strokeWidth={strokeWidth} className={trackClassName} fill="none" />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={fillClassName}
          style={{ stroke: color, strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </g>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className={textClassName}>
        {pct}%
      </text>
    </svg>
  );
}
