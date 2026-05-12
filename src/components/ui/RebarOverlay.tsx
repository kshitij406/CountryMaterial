interface RebarOverlayProps {
  className?: string
}

export default function RebarOverlay({ className = '' }: RebarOverlayProps) {
  return (
    <svg
      viewBox="0 0 120 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {([48, 116, 184, 252] as const).map((y, ri) => (
        <g key={y} opacity={Math.max(0.18, 0.52 - ri * 0.08)}>
          <line
            x1="0" y1={y} x2="120" y2={y}
            stroke="currentColor" strokeWidth="3.5"
            strokeDasharray="88 6" strokeLinecap="round"
          />
          {([16, 48, 80, 112] as const).map((x) => (
            <line
              key={x}
              x1={x} y1={y - 10} x2={x} y2={y + 10}
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
