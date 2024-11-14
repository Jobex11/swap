/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-teal": "rgb(26, 147, 147)",
        "hover-teal": "rgb(23, 172, 172)",
        "custom-green": "rgb(11, 87, 11)",
        "hover-green": "rgb(13, 106, 13)",
      },
      screens: {
        xs: "480px", // Extra small screens (or any size you prefer)
      },
    },
  },
  plugins: [],
};
