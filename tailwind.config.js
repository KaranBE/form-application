/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: [
      './src/**/**/*.{js,ts,jsx,tsx,html,mdx}',
      './src/**/*.{js,ts,jsx,tsx,html,mdx}',
    ],
    darkMode: 'class',
    theme: {
      screens: {md: {max: '1050px'}, sm: {max: '550px'}},
      extend: {
        width: {
          'webkit-fill': '-webkit-fill-available',
        },
        colors: {
          black: {'900_14': 'var(--black_900_14)'},
          blue_gray: {
            700: 'var(--blue_gray_700)',
            900: 'var(--blue_gray_900)',
            '900_01': 'var(--blue_gray_900_01)',
            '900_02': 'var(--blue_gray_900_02)',
            '900_03': 'var(--blue_gray_900_03)',
          },
          cyan: {800: 'var(--cyan_800)'},
          deep_orange: {100: 'var(--deep_orange_100)'},
          green: {a100: 'var(--green_a100)'},
          grey_7: 'var(--grey_7)',
          outline: 'var(--outline)',
          red: {400: 'var(--red_400)', 700: 'var(--red_700)'},
          teal: 'var(--teal)',
          white: 'var(--white)',
        },
      },
      boxShadow: {xs: '0 4px 30px 0 #00000014'},
      fontFamily: {lato: 'Lato', roboto: 'Roboto'},
    },
  
    plugins: [import('@tailwindcss/forms')],
}

