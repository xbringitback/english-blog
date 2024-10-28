import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: "640px",
      md: "780px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: "#f9f4ea",
        premium: "#333333",
        accent: {
          DEFAULT: "#8E9A5B",
          hover: "#aad000",
        },
      },
    },
  },
  plugins: [],
};
export default config;
