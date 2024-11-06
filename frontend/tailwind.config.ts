import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans Thai", "sans-serif"],
      },
      screens: {
        sm: '375px',   // mobile
        md: '768px',   // iPad
        lg: '1024px',  // desktop
      },
      fontSize: {
        heading1: "32px",
        heading2: "28px",
        heading3: "20px",
        title1: "16px",
        title2: "14px",
        body1: "16px",
        body2: "14px"
      },
      colors: {
        primary: "#000000D9",
        secondary: "#0000008C",
        divider: "#0000000F",
        grey10: "#262626",
        grey20: "#404040",
        grey30: "#595959",
        grey40: "#737373",
        grey50: "#8c8c8c",
        grey60: "#a6a6a6",
        grey70: "#bfbfbf",
        grey80: "#d9d9d9",
        grey90: "#f2f2f2",
        grey100: "#ffffff",
        primary10: "#4c1401",
        primary20: "#7e2102",
        primary30: "#b02e02",
        primary40: "#e33c03",
        primary50: "#fc541b",
        primary60: "#fd7b4f",
        primary70: "#fda181",
        primary80: "#fec6b3",
        primary90: "#ffece6"
      },
    },
  },
  plugins: [],
};
export default config;
