/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/animations/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3F4E41",
        secondary: "#47B772",
        third: "#606060",
        green1: "#0A4035",
        gray1: "#908AA0",
        black1: "#101010",
        bgColor: "#C2F1B2",
      },
      screens: {
        sm: "600px",
        md: "900px",
        xs: "400px",
        lg: "1150px",
        xl: "1500px",
      },
      fontFamily: {
        plus: ["Plus Jakarta Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        banner: "url('/assets/banner.webp')",
        cta: "url('/assets/cta.webp')",
        faq_banner: "url('/assets/bg_faq.webp')",
        author: "url('/assets/bg_author.webp')",
        uninstall_banner: "url('/assets/bg_uninstall.webp')",
        bg_form: "url('/assets/bg_form.svg')",
        circle_bg: "url('/assets/bg_newsletter.svg')",
        avail_banner: "url('/assets/bg_avail.webp')",
      },
    },
  },
  plugins: [],
});
