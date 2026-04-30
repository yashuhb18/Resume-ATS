/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Outfit',           'system-ui', 'sans-serif'],
        display: ['Familjen Grotesk', 'Outfit',    'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono',   'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        success: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#34d399',
          600: '#10b981',
          700: '#059669',
        },
        warning: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          500: '#fbbf24',
          600: '#f59e0b',
          700: '#d97706',
        },
        danger: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          500: '#fb7185',
          600: '#f43f5e',
          700: '#e11d48',
        },
        info: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          500: '#c084fc',
          600: '#a855f7',
          700: '#9333ea',
        },
      },
      boxShadow: {
        'brand-sm':    '0 0 16px rgba(139,92,246,0.30), 0 0 32px rgba(139,92,246,0.10)',
        'brand':       '0 0 40px rgba(139,92,246,0.40), 0 0 80px rgba(139,92,246,0.15)',
        'glass':       '0 8px 32px rgba(0,0,0,0.40), 0 1px 0 rgba(255,255,255,0.06) inset',
        'card-dark':   '0 6px 28px rgba(0,0,0,0.60), 0 3px 8px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.03)',
        'elevated':    '0 24px 80px rgba(0,0,0,0.70), 0 12px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
        'success-glow':'0 0 25px rgba(52,211,153,0.35), 0 0 50px rgba(52,211,153,0.12)',
        'danger-glow': '0 0 25px rgba(251,113,133,0.30), 0 0 50px rgba(251,113,133,0.10)',
        'violet-glow': '0 0 30px rgba(155,126,247,0.35), 0 0 60px rgba(155,126,247,0.12)',
      },
      animation: {
        'fade-in':     'fadeIn 0.55s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'fade-in-up':  'fadeInUp 0.55s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'slide-up':    'slideUp 0.5s ease-out',
        'pulse-slow':  'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'pulse-glow':  'pulseGlow 2.8s ease-in-out infinite',
        'spin-slow':   'spin 2s linear infinite',
        'float':       'float 4.5s ease-in-out infinite',
        'gradient':    'gradientShift 5s ease-in-out infinite',
        'aurora':      'auroraShift 6s ease-in-out infinite',
        'blob':        'morphBlob 12s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)',    filter: 'blur(0)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        auroraShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '33%':      { backgroundPosition: '100% 30%' },
          '66%':      { backgroundPosition: '50% 100%' },
        },
        morphBlob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%':      { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 14px rgba(139,92,246,0.28), 0 0 28px rgba(139,92,246,0.10)' },
          '50%':      { boxShadow: '0 0 32px rgba(139,92,246,0.60), 0 0 60px rgba(139,92,246,0.24)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%':      { transform: 'translateY(-9px) rotate(0.5deg)' },
          '66%':      { transform: 'translateY(-5px) rotate(-0.5deg)' },
        },
      },
      transitionTimingFunction: {
        'snappy':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'cinematic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};
