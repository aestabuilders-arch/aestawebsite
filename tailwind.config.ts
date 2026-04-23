import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: { 50: '#fdf6f3', 500: '#c45a3a', 600: '#a94828', 700: '#8a3a20' },
        limestone: { 50: '#faf7f2', 100: '#f5efe6', 200: '#e9dfcc' },
        sage: { 500: '#6b8e6a', 600: '#577657' },
        charcoal: { 800: '#2b2a28', 900: '#1a1918' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        tamil: ['var(--font-tamil)', 'system-ui', 'sans-serif'],
        'tamil-display': ['var(--font-tamil-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
