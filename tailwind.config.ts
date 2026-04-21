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
        navy: {
          DEFAULT: '#0B1D3A',
          deep: '#05101f',
          light: '#162D56',
        },
        gold: {
          DEFAULT: '#C8962E',
          light: '#E8B84B',
          dim: '#8A6520',
          pale: '#F2D98A',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EAE0',
        },
        sand: '#E8DED1',
        charcoal: '#1A1A2E',
        slate: '#2C3E50',
      },
      fontFamily: {
        heading:   ['var(--font-dm-serif)', 'Georgia', 'serif'],
        body:      ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        display:   ['var(--font-bebas)', 'sans-serif'],
        barlow:    ['var(--font-barlow)', 'sans-serif'],
        condensed: ['var(--font-barlow-condensed)', 'sans-serif'],
        space:     ['var(--font-space-mono)', 'monospace'],
      },
      spacing: {
        section: '6rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        container: '80rem',
      },
      animation: {
        marquee:          'marquee 30s linear infinite',
        'marquee-reverse':'marquee-reverse 30s linear infinite',
        ticker:           'ticker 40s linear infinite',
        'scroll-bar':     'scrollBar 2s infinite cubic-bezier(0.16, 1, 0.3, 1)',
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
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollBar: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
