const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#110e1a',
          900: '#1a1625',
          800: '#231e33',
          700: '#3a334f',
        },
        brand: {
          purple: '#a855f7',
          pink: '#ff2d88',
          blue: '#3b82f6',
          teal: '#14b8a6',
        },
        gold: '#facc15',
        'light-text': '#e0ddeb',
        'subtle-text': '#908a9d',
        ludo: {
          red: { DEFAULT: '#ef4444', dark: '#dc2626' },
          green: { DEFAULT: '#22c55e', dark: '#16a34a' },
          blue: { DEFAULT: '#3b82f6', dark: '#2563eb' },
          yellow: { DEFAULT: '#eab308', dark: '#ca8a04' },
          path: '#f3f4f6',
          'path-dark': '#e5e7eb',
        },
      },
      boxShadow: {
        'glow-purple': '0 0 20px 5px rgba(168, 85, 247, 0.3)',
        'glow-pink': '0 0 20px 5px rgba(255, 45, 136, 0.3)',
        'inner-strong': 'inset 0 4px 8px rgba(0,0,0,0.2)',
      },
      animation: {
        'dice-roll': 'diceRoll 0.5s ease-in-out',
        'token-move': 'tokenMove 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        diceRoll: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.2)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(1.2)' },
        },
        tokenMove: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%': { transform: 'translatey(0px)' },
          '50%': { transform: 'translatey(-10px)' },
          '100%': { transform: 'translatey(0px)' },
        },
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
