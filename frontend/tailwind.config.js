/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#22c55e", // verde
          900: "#052e1b",
        },
      },
      boxShadow: {
        ringbrand: "0 0 0 4px rgba(34,197,94,.15)",
      },
    },
  },
  plugins: [],
};
