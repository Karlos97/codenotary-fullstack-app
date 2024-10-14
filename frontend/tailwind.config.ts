import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
