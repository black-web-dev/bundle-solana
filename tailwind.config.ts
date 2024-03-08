import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      fontFamily: {
        CalSans: ['Cal Sans SemiBold'],
        ClashDisplay: ['ClashDisplay'],
      },
      colors: {
        text: {
          100: '#F1F1F1',
          200: '#9F9F9F',
        },
        bg: {
          100: '#030116',
          200: '#161616',
          300: '#1C1C1C'
        },
        main: {
          100: '#673DFF',
          200: '#734DFA'
        },
        border: {
          100: '#ffffff0d',
        },
      },
      boxShadow: {
        inputFocus: '0 0 10px 2px rgb(255 255 255 / 29%)',
        card: '0px 4px 4px 0px #00000040',
        bottomBar: '0 -1px 4px rgba(0,0,0,.25)',
      },
      backgroundImage: {
        subHeader: "url('/images/home/sub_header.png')",
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        ripple: {
          to: { transform: 'scale(4)', opacity: '1' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        ripple: 'ripple 600ms linear',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
} satisfies Config;
