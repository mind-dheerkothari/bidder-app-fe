/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "brand-start": "#7b2334", // primary-gradient-start
        "brand-end": "#9f3247", // primary-gradient-end
        "brand-start-dark": "#5c1a27", // primary-gradient-start, darkened ~10%
        primary: "#9f3247", // primary-text
        secondary: "#a19d9e", // secondary-text
        "error-bg": "#ffdde1", // error-text (bg for error banners)
        placeholder: "#a9a9a9", // placeholder-color
        "bg-grey": "#f3f1f7", // background-grey
        "link-bg": "#ffffff2b",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(89.28deg, #7b2334 5.99%, #9f3247 94.17%)",
        "brand-gradient-hover": "linear-gradient(89.28deg, #5c1a27 5.99%, #9f3247 94.17%)",
      },
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
