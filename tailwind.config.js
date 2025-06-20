/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        them: "#6c7fd8",
        text: "#686e7d"
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],

}

