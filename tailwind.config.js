/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '315px', 
      'xsm': '500px', 
      'sm': '640px',
      'md': '1024px',
      
    }
  },
  plugins: [],
  darkMode: 'class',
}