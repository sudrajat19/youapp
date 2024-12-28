/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "regal-gray": "#1F4247",
        "regal-dark": "#0D1D23",
        "regal-black": "#09141A",
        "regal-blue": "#62CDCB",
        "regal-sky": "#4599DB",
        "gold-300": "#D5BE88",
        "gold-400": "#FFE2BE",
        "gold-500": "#F8FAE5",
        "gold-600": "#F3EDA6",
        "gold-700": "#94783E",
        bck: "#162329",
      },
      backgroundImage: {
        "multi-color-text":
          "linear-gradient(to right, #D5BE88, #F8FAE5, #FFE2BE, #F3EDA6,#94783E)",
        "multi-color-blue":
          "linear-gradient(to right, #AADAFF, #4599DB, #ABFFFD)",
        "multi-color-button": "linear-gradient(to right, #4599DB, #62CDCB)",
      },
    },
  },
  plugins: [],
};
