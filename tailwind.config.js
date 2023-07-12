const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        border: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        tertiary: 'hsl(var(--tertiary))',
        destructive: 'hsl(var(--destructive))',
      },
      spacing: {
        'nav-height': 'var(--nav-height)',
      },
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          '2xl': '1280px',
        },
      },
      backgroundImage: {
        'logo-gradient':
          'conic-gradient(from 180deg at 50% 50%,#ff7a85 0deg,#a488f6 112.5deg,#1a8cff 228.75deg,#ff7a85 360deg)',
        'image-gradient':
          'conic-gradient(from 180deg at 50% 50%,#ff7a85 0deg,#a488f6 112.5deg,#1a8cff 228.75deg,#0d1117 360deg)',
        'button-gradient':
          'linear-gradient(to bottom right,#a488f6ee,#1a8cffaa);',
        'border-gradient':
          'radial-gradient(62.87% 100% at 50% 100%,rgba(255,255,255,.12) 0%,rgba(255,255,255,0) 100%)',
        'header-gradient':
          'radial-gradient(37.74% 81.78% at 50% 26.56%,rgba(164, 136, 246,.06) 0%,rgba(3,0,20,0) 100%)',
        'divider-gradient':
          'linear-gradient(90deg, hsla(218, 18%, 21%, 1) 45%, hsla(218, 18%, 21%, 0) 45%, hsla(218, 18%, 21%, 0) 55%, hsla(218, 18%, 21%, 1) 55%);',
        'service-card-gradient':
          'linear-gradient(90deg,rgba(255,255,255,0) 0%, #a488f6 50%, rgba(0,255,0,0) 100%);',
        'secondary-track':
          'linear-gradient(0deg,rgba(255,255,255,0) 0%, #a488f655 50%, rgba(0,255,0,0) 100%);',
      },
      boxShadow: {
        button: 'rgba(26,140,255,0.3) 0px 0px 40px',
        hero: 'rgba(0, 99, 198, 0.1) 0px 0px 150px 100px',
        'hero-secondary': 'rgba(164, 136, 246, 0.1) 0px 0px 150px 100px',
        'hero-image': 'rgba(0, 99, 198, 0.1) 0px 0px 150px 20px',
        dashboard: 'rgba(0, 99, 198, 0.07) 0px 0px 200px 20px',
        'secondary-card': 'rgba(164, 136, 246, 0.1) 0px 4px 24px',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        rotate: 'rotate 20s linear infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
