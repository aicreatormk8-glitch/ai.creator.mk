import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury AI palette — graphite + custom Tiffany-style turquoise
        graphite: {
          950: '#070b0c',
          900: '#0a0f10',
          850: '#0d1416',
          800: '#11191b',
          700: '#172224',
          600: '#1f2c2f',
        },
        teal: {
          // Brand turquoise — softer & richer than Tiffany Blue
          DEFAULT: '#34e3c4',
          50: '#e9fffb',
          100: '#c4fff3',
          200: '#8df8e6',
          300: '#52edd1',
          400: '#34e3c4',
          500: '#1fc7aa',
          600: '#16a08a',
          700: '#157d6e',
          800: '#15625a',
          900: '#15514b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'teal-glow':
          'radial-gradient(circle at 50% 0%, rgba(52,227,196,0.18), transparent 60%)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(52,227,196,0.45)',
        'glow-lg': '0 0 80px -10px rgba(52,227,196,0.5)',
        glass:
          '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 12s ease infinite',
        shimmer: 'shimmer 2.5s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
