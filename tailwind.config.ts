import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-clr': '#4E4848',
        'almost-black': '#181816',
        'almost-white': '#F8F7F2',
        'primary-light': '#C3C6B6',
        'secondary-light': '#DDDFD6',
        'primary-dark': 'rgba(0,0,0,.5)',
        'primary-dark-btn': 'rgba(0,0,0,.3)',
        'secondary-dark': '#11201D',
        accent: '#FF9A00',
        error: '#FF7A00',
        success: '#C6FF00',
        info: '#8C946F',
        sutraCardDivider: '#D9D9D9',
        sutraButtonTextColor: '#2E363E',
        sutraContactUsTempBg: '#FBFBFB',
        sutraPlaceholderClr: '#8D8D8D',
        sutraRadioBgUnchecked: '#E0E0E0',
        ///
        sutraButtonText: '#F0FDF4',
      },

      //BG-COLORS-BUTTON
      backgroundImage: {
        sutraGradientButton: 'linear-gradient(180deg, rgba(90,93,82,1) 0%, rgba(36,41,40,1) 100%)',
        sutraGradientButtonDark: 'linear-gradient(180deg, rgba(188,192,175,1) 0%, rgba(178,182,137,1) 100%)',
        sutraNoiseBg: 'url("./images/scalar-noise-opt.png")',
      },

      //KEYFRAMES
      keyframes: {
        animateGrain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': {
            transform: 'translate(-5%,-10%)',
          },
          '20%': {
            transform: 'translate(-15%,-20%)',
          },
          '30%': {
            transform: 'translate(-5%,-10%)',
          },
          '40%': {
            transform: 'translate(-15%,-20%)',
          },
          '50%': {
            transform: 'translate(-5%,-10%)',
          },
          '60%': {
            transform: 'translate(-15%,-20%)',
          },
          '70%': {
            transform: 'translate(-5%,-10%)',
          },
          '80%': {
            transform: 'translate(-15%,-20%)',
          },
          '90%': {
            transform: 'translate(-5%,-10%)',
          },
          '100%': {
            transform: 'translate(-15%,-20%)',
          },
        },

        textAppear: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      //ANIMATION

      animation: {
        animateFilm: 'animateGrain 8s steps(10) infinite',
        textAppear: 'textAppear 1.5s ease-out forwards',
      },

      //OUTLINE
      outlineWidth: {
        sutraButtonOutline: '2px',
        sutraButtonOutlineAsPrim: '1px',
        sutraButtonOutlineAsPrimHover: '2.5px',
      },

      //BORDER
      borderWidth: {
        sutraButtonBorder: '2px',
        sutraButtonBorderAsPrim: '1px',
        sutraButtonBorderAsPrimHover: '2.5px',
      },

      //OPACITY
      opacity: {
        ghostButtonOpacity: '0.5',
      },

      fontSize: {
        h1: '3.4375rem',
        h2: '2.5rem',
        h3: '1.875rem',
        h4: '1.3125rem',
        body: '1.125rem',
        default: '1rem',
        small: '0.875rem',
        tag: '0.75rem',
        contactFormSidebarHeading: '1.75rem',
        //////// FIGMA ///////
        h0_2xl: '4.5rem',
        h1_xl: '3.75rem',
        h2_lg: '3rem',
        h3_md: '2.25rem',
        h4_sm: '1,875rem',
        h5_xs: '1.5rem',
        xl: '1.25rem',
        lg: '1.125rem',
        md: '1rem',
        sm: '0.875rem',
        xs: '0.75rem',
        base: '1rem',
      },

      borderRadius: {
        sutraCardBorderRadius: '4px',
        sutraCardTagBorderRadius: '6px',
        sutraContactCardBorderRadius: '10px',
        sutraContactFormButton: '5px',
        sutraObavijestTrakaRadius: '12px',
        //BUTTONS//
        sutraButtonBorderRadiusSmall: '20px',
        sutraButtonBorderRadiusBase: '46px',
        sutraButtonBorderRadiusLarge: '56px',
      },

      lineHeight: {
        sutraCardTitleLineHeight: '32px',
      },
      maxWidth: {
        sutraBlogTestMaxWidth: '750px',
        sutraContactUsTempFormWidth: '1200px',
        serviceCardDesktop: '300px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar'), require('@tailwindcss/forms')],
};
export default config;
