/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bingsooYellow: '#FFCE00',
        bingsooBlue: '#0091D5',
        bingsooOrange: '#F37021',
      },
    },
  },
  plugins: [],
}
