/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        tulpen: ["Tulpen One", "cursive"],
      },
      backgroundImage: {
        landing: "url('http://localhost:3000/landing.jpg')",
      },
    },
  },
  plugins: [],
};
