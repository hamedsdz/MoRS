/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js", "./layouts/**/*.js"],
  important: true,
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#0b0c11",
        secondary: "#1b2a4a",
        tertiary: "#595b63",
        accent: "#0449e9",
        background: "#ededee",
        text: "#9c9da2",
        link: "#1a429c",
        button: "#5195ea",
      },
      boxShadow: {
        card: "0px 15px 35px rgba(0,0,0,.25)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
