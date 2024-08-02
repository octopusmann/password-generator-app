/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#24232C",
        "dark-black": "#18171F",
        "neon-green": "#A4FFAF",
        "custom-red": "#F64A4A",
        "custom-orange": "#FB7C58",
        "custom-yellow": "#F8CD65",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
