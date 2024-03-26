/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/tw-elements/dist/js/**/*.js"
 ],
 darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'theme': '#28CC9E',
         theme: {
          100: '#28CC9E',
          200: '#1E9976',
         }
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui"),
  require("tw-elements/dist/plugin.cjs")        
],
}

