/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    boxShadow: {
      shdw: '0px 0px 14px 2px gray',
    },
    screens: {
      sm: '640px',  // Small screens
      md: '768px',  // Medium screens
      lg: '1024px', // Large screens
      xl: '1280px', // Extra large screens
    },
  },
  plugins: [],
}