module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        DEFAULT:
          "0 2px 3px 0 rgba(239, 239, 239, 0.2), 0 2px 3px 0 rgba(239, 239, 239, 0.2)",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        purple: {
          light: "#BE8ABC",
          DEFAULT: "#9C5AFF",
          dark: "#913AFF",
        },
        gray: {
          dark: "#3c4858",
          DEFAULT: "#C4C4C4",
          light: "#EEEEEE",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
