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
        squirtle: {
          50: '#ecfeff',
          100: '#cffbfe',
          200: '#a5f4fc',
          300: '#68e9f8',
          400: '#47dcf0',
          500: '#07b8d3',
          600: '#0993b1',
          700: '#0f768f',
          800: '#155f75',
          900: '#164f63',
          950: '#083444',
        },
      },
    },
  },
  plugins: [],
};
