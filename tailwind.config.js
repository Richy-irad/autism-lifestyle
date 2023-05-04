/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF8E3C",
        secondary: "#D9376E",
        dark: "#0D0D0D",
        black: "#0D0D0D",
        blue: "#00BBFF",
        concrete: "#F2F2F2",
        monte: "#8CD4D4",
        light: "#CFCFCF",
        anakiwa: "#B3DFFF",
      },
    },
  },
  plugins: [],
};
