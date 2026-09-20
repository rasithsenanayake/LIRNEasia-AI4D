/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FBFAF7',
        surface: '#FFFFFF',
        raised: '#F4F1EA',
        ink: {
          DEFAULT: '#14202E',
          soft: '#3C4A59',
          muted: '#657282',
          inverse: '#F7F5F0',
        },
        line: {
          DEFAULT: '#E5E1D8',
          strong: '#CFC9BC',
        },
        accent: {
          DEFAULT: '#0E5265',
          dark: '#0A3B49',
          mid: '#3A7E91',
          soft: '#D9E7EB',
          wash: '#EDF3F5',
        },
        cat: {
          governance: '#0E5265',
          innovation: '#9A5A26',
          inclusion: '#6A4A78',
          data: '#33624A',
          readiness: '#8A4034',
          sustainability: '#4F6B33',
          ecosystem: '#3C5A8A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '80rem',
        reading: '44rem',
      },
      fontSize: {
        meta: ['0.8125rem', { lineHeight: '1.15rem', letterSpacing: '0.005em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 32, 46, 0.04)',
        lift: '0 6px 18px -8px rgba(20, 32, 46, 0.18)',
        panel: '0 12px 40px -16px rgba(20, 32, 46, 0.28)',
      },
      transitionTimingFunction: {
        exit: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
