/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./index.html', './src/pages/**/*.html', './src/js/**/*.js'],
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
      keyframes: {
        flip: {
          '0%': {
            transform: 'perspective(400px) rotateY(0)',
            'animation-timing-function': 'ease-out',
          },
          '40%': {
            transform: 'perspective(400px) translateZ(50px) rotateY(170deg)',
            'animation-timing-function': 'ease-out',
          },
          '50%': {
            transform: 'perspective(400px) translateZ(80px) rotateY(190deg) scale(1)',
            'animation-timing-function': 'ease-in',
          },
          '80%': {
            transform: 'perspective(400px) rotateY(360deg) scale(0.95)',
            'animation-timing-function': 'ease-in',
          },
          '100%': {
            transform: 'perspective(400px) scale(1)',
            'animation-timing-function': 'ease-in',
          },
        },
      },
    },
  },
  plugins: [],
}
