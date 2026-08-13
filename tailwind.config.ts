import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette ────────────────────────────────────────────────────
        navy: {
          DEFAULT: 'var(--navy)',       // primary dark background — themed, see globals.css
          mid:     'var(--navy-mid)',   // charcoal — stats, hero overlays — themed
          light:   '#2C3E50',           // slate — body text on light bg — NOT themed
          deep:    'var(--navy-deep)',  // near-black for darkest sections — themed
        },
        gold: {
          DEFAULT: '#C8962E',   // primary accent
          light:   '#DBA840',   // hover
          dark:    '#A37824',   // on light surfaces
          pale:    '#F5EDD4',   // tint
          dim:     '#7A5A1E',   // deep dimmed gold for dark surfaces
        },
        cream: '#FAF7F2',       // warm off-white — light section backgrounds
        sand:  '#E8DED1',       // warm beige — borders, dividers
        // ── Text tokens ──────────────────────────────────────────────────────
        ink:   '#1A1A2E',       // primary text on light (charcoal)
        slate: '#2C3E50',       // body text on light
        mist:  '#8896A7',       // muted text
        // ── Surface tokens ────────────────────────────────────────────────────
        surface: {
          DEFAULT: '#FAF7F2',   // cream
          mid:     '#F0E8DC',   // warm mid
          border:  '#E8DED1',   // sand
        },
        charcoal: 'var(--navy-mid)', // legacy alias — themed, same as navy.mid
        // ── Legacy aliases (keep classes working in old pages) ───────────────
        sky: {
          DEFAULT: '#C8962E',   // remapped to gold
          light:   '#DBA840',
          pale:    '#F5EDD4',
        },
        emerald: {
          DEFAULT: '#2E7D54',   // kept for circular/eco callouts
          light:   '#3D9E6A',
          pale:    '#D4EDE0',
        },
        amber: {
          DEFAULT: '#C8962E',   // alias to gold
          light:   '#DBA840',
          pale:    '#F5EDD4',
          dim:     '#A37824',
        },
        'text-primary':       '#1A1A2E',
        'text-secondary':     '#4A5568',
        'text-muted':         '#8896A7',
        // Text/borders sitting directly on a navy-family background — tracks
        // --inverse-rgb (see globals.css) so `text-inverse`, `text-inverse/70`,
        // `border-inverse` etc. replace what used to be literal `text-white/NN`,
        // and stay legible whichever theme flips the navy family light or dark.
        inverse: 'rgb(var(--inverse-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans:      ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display:   ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        heading:   ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        body:      ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono:      ['var(--font-space-mono)', 'monospace'],
        space:     ['var(--font-space-mono)', 'monospace'],
        condensed: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        barlow:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        section:      '6rem',
        'section-sm': '4rem',
        '18':         '4.5rem',
      },
      maxWidth: {
        container:        '80rem',
        'container-wide': '90rem',
      },
      animation: {
        marquee:           'marquee 45s linear infinite',
        'marquee-slow':    'marquee 70s linear infinite',
        'marquee-reverse': 'marquee-reverse 45s linear infinite',
        'pulse-slow':      'pulse 3s ease-in-out infinite',
        'fade-up':         'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        industrial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth:     'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
