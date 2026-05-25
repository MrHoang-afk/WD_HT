/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Montserrat"', "system-ui", "sans-serif"],
      },
      colors: {
        rose: {
          blush: "#ffd1dc",
          gold: "#e8c4a0",
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
      },
    },
  },
  plugins: [],
};
