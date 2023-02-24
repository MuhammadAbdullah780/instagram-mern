/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode:'jit',
  // darkMode: ['class', '[data-mode="dark"]'],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        // light theme colors 
        'main-l-bg':'#fafafa',
        'txt-h-l':'#262626',
        'txt-p-l':'#7f7f7f',
        'border-bg-l':'#dbdbdb',

        // sidebar alternates are #ffff and #000 backgrounds
        'insta-blue':'#066db0',

        // dark theme colors 
        'main-d-bg': '#121212',
        'txt-h-d': '#fafafa',
        'txt-p-d': '#cccccc',
        'border-bg-d':'#262626',

      },
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
        'OpenSans': ['"Open Sans"', 'sans-serif'],
        'Montserrat':['Montserrat', 'sans-serif'],
        'Roboto':['Roboto', 'sans-serif'],

      },
      screens: {
        'material-md': '900px',
        'small-mobile': '450px',
        'mobile': '600px',
      },
      aspectRatio: {
        'post': '5/4',
      },
    },
  },
  plugins: [],
}