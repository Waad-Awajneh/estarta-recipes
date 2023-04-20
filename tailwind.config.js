/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      cover: { max: "500px" },
      // xss: { min: "322px" },
      // xsm: { max: "321px" },
      // card: { min: "500px" },
      // pm1400: { max: "1440px" },
      // pmi1400: { min: "1444px" },
      // pm900: { max: "900px" },
      // pmi900: { min: "900px" },
      // pmi720: { min: "720px" },
      // pm780: { max: "780px" },
      pm600: { max: "600px" },
      pm720: { max: "720px" },
      // pmi600: { min: "600px" },
    },
  },
  plugins: [require("flowbite/plugin")],
};
