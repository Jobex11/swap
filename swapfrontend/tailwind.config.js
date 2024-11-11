/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-teal": "rgb(26, 147, 147)",
        "hover-teal": "rgb(23, 172, 172)",
      },
    },
  },
  plugins: [],
};
