/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily:{
        poppins: ["Poppins", "sans-serif"]
      },
      colors:{
        'ronchi': {
        '50': '#fef9ec',
        '100': '#fbefca',
        '200': '#f6df91',
        '300': '#f0c347',
        '400': '#eeb331',
        '500': '#e79319',
        '600': '#cc7013',
        '700': '#aa4f13',
        '800': '#8a3e16',
        '900': '#723415',
        '950': '#411907',
        },
      }
    },
  },
  plugins: [],
};
