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
        transparent: "transparent",
        current: "currentColor",
        red: {
          100: "#c1181e",
          400: "#cc4249",
          700: "#fd0002",
          900: "#57242a",
        },
        gray: {
          100: "#b8b9bd",
          400: "#505155",
          700: "#1d1e22",
          900: "#18191d",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
