// tailwind.config.js — updated version without DaisyUI since kept breakin, with custom InkSpiration color palette preserved
// make sure this matches actual view file paths
module.exports = {
  content: [
    "./views/**/*.ejs",      // reading for all ejs view templates
    "./views/**/*.html",     // if any static HTMLs later
    "./public/**/*.js",      // client-side JS
    "./public/**/*.css"      // option to add man written css
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7B2CBF",
        secondary: "#9D4EDD",
        accent: "#FFD166",
        neutral: "#2A2E37",
        "base-100": "#F3F4F6",
        info: "#3ABFF8",
        success: "#36D399",
        warning: "#FBBF24",
        error: "#F87171",
        logo: "#5FC4B6" // from InkSpiration palette n logo colors
      },
      animation: { //added animations for text on index.ejs, cool backflips, lasts like 1 sec
        'fade-down': 'fadeDown 1.3s ease-out',
        'fade-up': 'fadeUp 1.3s ease-out',
        'slide-in': 'slideIn 1.3s ease-out',
        'slide-in-left': 'slideInLeft 1s ease-out',
        'slide-in-right': 'slideInRight 1s ease-out',
      },
      keyframes: {
        fadeDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-50%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(50%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: []
}
