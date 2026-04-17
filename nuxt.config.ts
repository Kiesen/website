// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/eslint', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
      ],
    },
  },

  routeRules: {
    '/apple-touch-icon.png': { redirect: '/favicon.svg' },
    '/apple-touch-icon-precomposed.png': { redirect: '/favicon.svg' },
  },

  experimental: {
    serverAppConfig: false,
  },
})
