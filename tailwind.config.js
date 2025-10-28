/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["MyCustomFont", "sans"], // "custom" is the name you will use in Tailwind
      },
    },
  },
  plugins: [],
}
