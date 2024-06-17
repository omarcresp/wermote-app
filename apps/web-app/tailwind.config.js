/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        weco: {
          '300': '#B2F294',
          '400': '#D9F2A5',
          '500': '#CCE39A',
          '600': '#1CA698',
          '700': '#136262',
        }
      }
    },
  },
  plugins: [],
}

