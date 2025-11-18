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
        primary: {
          purple: '#6366f1',
          indigo: '#4f46e5',
          lavender: '#a855f7',
        },
        accent: {
          pink: '#ec4899',
          blue: '#8b5cf6',
        },
        glass: {
          bg: 'rgba(139, 92, 246, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)',
          shadow: 'rgba(139, 92, 246, 0.25)',
        },
        text: {
          primary: '#f8fafc',
          secondary: 'rgba(248, 250, 252, 0.7)',
          muted: 'rgba(248, 250, 252, 0.5)',
        }
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-button': 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 100%)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      animation: {
        'breathe': 'breathe 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.6' },
          '50%': { transform: 'scale(1.3) rotate(180deg)', opacity: '1' },
        },
        'pulse-glow': {
          'from': {
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(99, 102, 241, 0.3)',
          },
          'to': {
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(99, 102, 241, 0.4)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config