/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d8eeff",
          500: "#0077b6",
          600: "#005f8f",
          700: "#004c73"
        }
      }
    }
  },
  plugins: []
};
