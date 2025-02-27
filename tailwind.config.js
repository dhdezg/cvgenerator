/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        midnight: {
          50: '#e9f9ff',
          100: '#cef0ff',
          200: '#a7e6ff',
          300: '#6bdbff',
          400: '#26c2ff',
          500: '#009aff',
          600: '#0070ff',
          700: '#0055ff',
          800: '#0048e6',
          900: '#0043b3',
          950: '#001433',
        },
      },
      fontSize: {
        '2xs': ['0.5rem', { lineHeight: '0.75rem' }],
      },
    },
  },
  plugins: [],
};
