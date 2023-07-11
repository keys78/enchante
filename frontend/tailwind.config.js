/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      opensans: ["Open Sans', sans-serif"],
      nunitosans: ["Nunito Sans', sans-serif"],
    },
    screens: {
      's-375': '375px',
      's-400': '400px',
      's-480': '480px',
      's-700': '700px',
      's-767': '767px',
      's-991': '991px',
      's-1024': '1024px',
      's-1025': '1025px',
      's-1220': '1220px',
      's-1440': '1440px',
      's-1920': '1920px',
    },
    extend: {
      colors: {
        onyx:"#2E3532",
        resdaGreen:"#7E9181",
        frenchGray:"#C7CEDB",
        newWhite:"#fdfdfd",
        textGray:"#c3c3c3",
        btnGray: "#444757",
        mainRed: "#EA5555",
        orangeSkin:"#f75a2c",
        modalBackgroundLayer: 'rgba(0, 0, 16, 0.2)',
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

