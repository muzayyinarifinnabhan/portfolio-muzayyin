/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0F3D2E',
        secondary: '#1A1714',
        muted: '#524D48',
        accent: '#C45A1A',
        dark: {
          100: '#1A1714',
          200: '#141210',
          300: '#0A0908',
        },
        light: {
          100: '#FFFCF7',
          200: '#F3EBE0',
          300: '#DDD2C4',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
      },
      animation: {
        'blob': 'blob 9s ease-in-out infinite',
        'blob-slow': 'blob 14s ease-in-out infinite reverse',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.7s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 1.5s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'draw-line': 'drawLine 0.8s ease-out forwards',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(24px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-16px, 16px) scale(0.94)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(224, 112, 48, 0.2)' },
          '50%': { boxShadow: '0 0 0 8px rgba(224, 112, 48, 0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drawLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
