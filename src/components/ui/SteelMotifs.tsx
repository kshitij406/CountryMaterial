type MotifName = 'rebar' | 'coil' | 'billet' | 'spark'

export default function SteelMotif({
  name,
  className = '',
}: {
  name: MotifName
  className?: string
}) {
  switch (name) {
    case 'rebar':
      return (
        <svg
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <g opacity="0.9" stroke="currentColor" strokeWidth="2">
            <path d="M34 88h252" strokeDasharray="34 8" strokeLinecap="round" />
            <path d="M34 124h252" strokeDasharray="34 8" strokeLinecap="round" />
            <path d="M34 160h252" strokeDasharray="34 8" strokeLinecap="round" />
            <path d="M34 196h252" strokeDasharray="34 8" strokeLinecap="round" />
            <path d="M34 232h252" strokeDasharray="34 8" strokeLinecap="round" />
          </g>
        </svg>
      )

    case 'coil':
      return (
        <svg
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="2">
            <circle cx="180" cy="180" r="150" opacity="0.20" />
            <circle cx="180" cy="180" r="120" opacity="0.28" />
            <circle cx="180" cy="180" r="90" opacity="0.36" />
            <circle cx="180" cy="180" r="60" opacity="0.44" />
            <circle cx="180" cy="180" r="30" opacity="0.55" />
          </g>
          <path
            d="M255 115c18 14 32 34 38 57"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      )

    case 'billet':
      return (
        <svg
          viewBox="0 0 420 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="2" opacity="0.55">
            <path d="M84 78h210l52 52v112H136l-52-52V78z" />
            <path d="M294 78v112H136" />
            <path d="M84 190h210l52 52" />
          </g>
          <g stroke="currentColor" strokeWidth="2" opacity="0.25">
            <path d="M130 56h210l52 52v112H182l-52-52V56z" />
            <path d="M340 56v112H182" />
          </g>
        </svg>
      )

    case 'spark':
      return (
        <svg
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55">
            <path d="M160 40v64" />
            <path d="M160 216v64" />
            <path d="M40 160h64" />
            <path d="M216 160h64" />
            <path d="M72 72l46 46" />
            <path d="M202 202l46 46" />
            <path d="M248 72l-46 46" />
            <path d="M118 202l-46 46" />
          </g>
          <circle cx="160" cy="160" r="10" fill="currentColor" opacity="0.25" />
        </svg>
      )
  }
}
