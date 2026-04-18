import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C3E6B',
          hover: '#1A2A4A',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#A8B8C8',
          foreground: '#1A1A2E',
        },
        accent: {
          DEFAULT: '#C8D8E8',
          foreground: '#2C3E6B',
        },
        background: '#F8F9FB',
        foreground: '#1A1A2E',
        muted: '#6B7280',
        border: '#A8B8C8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        md: '10px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(44,62,107,0.08)',
        'card-hover': '0 4px 16px rgba(44,62,107,0.14)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config