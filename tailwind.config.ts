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
          DEFAULT: '#1F3347',
          deep: '#172838',
          light: '#2D475F',
        },
        gold: {
          DEFAULT: '#2E6FA3',
          light: '#3B84BF',
          dim: '#245C88',
          pale: '#D9E8F4',
        },
        cream: {
          DEFAULT: '#FFFFFF',
          dark: '#F7F9FB',
        },
        sand: '#D8E0E7',
        charcoal: '#EAF0F5',
        slate: '#22313F',
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
