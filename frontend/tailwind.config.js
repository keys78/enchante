/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      opensans: ["Open Sans', sans-serif"],
    },
    extend: {
      colors: {
        onyx:"#2E3532",
        resdaGreen:"#7E9181",
        frenchGray:"#C7CEDB",
        newWhite:"#fdfdfd",
        textGray:"#c3c3c3",
        btnGray: "#444757",
        orangie:"#f75a2c",
      },
      letterSpacing: {
        widest: "0.15rem",
      },
      boxShadow: {
        main: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
        secondary: "0px 10px 20px rgba(54, 78, 126, 0.25)",
      },
    },
  },
  plugins: [],
}

