module.exports = {
  purge: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      animation: {
        fadeIn: '1.2s ease fadeIn',
        glitch: '5s ease 5s infinite alternate glitch',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glitch: {
          '0%': {
            transform: 'rotateX(30deg) skewX(30deg)',
          },
          '2%': {
            transform: 'rotateX(0deg) skewX(0deg)',
          },
        },
      },
      backgroundImage: () => ({
        retro: "url('/images/retro.gif')",
      }),
    },
  },
  variants: {
    extend: {
      display: ['group-hover', 'hover', 'focus'],
    },
  },
  plugins: [],
};
