/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/views/**/*.pug'
  ],
  theme: {
    extend: {
      colors: {
        // Paleta 1
        'red-crayola': '#E84855',
        'ultraviolet': '#54577C',
        'mint-cream': '#F4FFFD',
        'black-olive': '#292E1E',
        'celestial-blue': '#279AF1',

        // Paleta 2
        'pearl': '#E7DFC6',
        'majorelle-blue':'#623CEA',
        'alice-blue':'#E9F1F7',
        'english-violet': '#54426B',
        'reislin-black': '#30292F'
        
      },
      fontFamily: {
        custom: ['Montserrat', 'sans'],
      },
    },
  },
  variants: {},
  plugins: [],
}
