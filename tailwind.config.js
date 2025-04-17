/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-mono': ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
      },
      opacity: {
        '85': '0.85',
      },
      backgroundColor: {
        'blue-900-90': 'rgba(30, 58, 138, 0.9)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}