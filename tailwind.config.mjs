/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4DB2EC",
        secondary: "#F9C100",
        tertiary: "#3A863D",
        quaternary: "#5D7987",
        quinary: "#222222",
        
      },
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        sans: ["Helvetica", "Arial", "sans-serif"],
        bonvivant: ["BonVivant", ...defaultTheme.fontFamily.sans],
        bonvivantSerif: ['BonVivantSerif', ...defaultTheme.fontFamily.sans],
        bonvivantSerifBold: ['BonVivantSerifBold', ...defaultTheme.fontFamily.sans],  
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
