module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: '1.2s ease fadeIn',
        glitch: '5s ease 5s infinite alternate glitch',
      },
      keyframes: {
        glitch: {
          '0%': {
            transform: 'rotateX(30deg) skewX(30deg)',
          },
          '2%': {
            transform: 'rotateX(0deg) skewX(0deg)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backgroundImage: () => ({
        retro: "url('/images/retro.gif')",
      }),
    },
  },
  variants: {
    extend: {
      animation: ['group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [],
};
