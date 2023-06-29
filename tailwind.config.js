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
        'image-gradient':
          'conic-gradient(from 180deg at 50% 50%,#ff7a85 0deg,#a488f6 112.5deg,#1a8cff 228.75deg,rgba(13, 17, 23, 0) 360deg)',
      },
    },
  },
  plugins: [],
};
