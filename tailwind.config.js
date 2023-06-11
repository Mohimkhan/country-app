/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './pages/**/*.html', './js/**/*.js'],
  darkMode: 'class',
  theme: {
    screens: {
      '2md': '975px', // for suggestion section 
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        "yellow-900": "var(--clr-yellow)",
        "dark-blue-700": "var(--dark-blue)",
        "dark-blue-900": "var(--very-dark-blue)",
        "dark-gray-700": "var(--dark-gray-input)",
        "dark-gray-400": "var(--very-light-gray)",
        "white-700": "var(--white)",
      },
    },
  },
  plugins: [],
}
