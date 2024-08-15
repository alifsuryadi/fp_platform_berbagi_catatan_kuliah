/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ["Open Sans"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "hijau-tua": "#1A5319",
      "hijau-muda": "#508D4E",
      "hijau-paling-muda": "#80AF81",
      "hijau-putih": "#D6EFD8",
      "abu-muda": "#B8B8B8",
      "abu-gelap": "#808080",
      white: "#FFFFFF",
      black: "#000000",
      red: "#DC143C",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
