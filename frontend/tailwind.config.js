/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0a0e27',
        'darker': '#050812',
        'purple-glow': '#a78bfa',
        'blue-glow': '#60a5fa',
      },
      backgroundImage: {
        'gradient-glow': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0e27 0%, #1e293b 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(167, 139, 250, 0.5)',
        'glow-blue': '0 0 20px rgba(96, 165, 250, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(167, 139, 250, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(167, 139, 250, 1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounce3d: {
          '0%, 100%': { transform: 'translateZ(0) translateY(0)' },
          '50%': { transform: 'translateZ(20px) translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        slideUp: 'slideUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out',
        bounce3d: 'bounce3d 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
