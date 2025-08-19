/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#06127E",
        secondary: "#54A7C3",
        base: "#5C5C5C",
      },
    },
  },
  plugins: [],
};
