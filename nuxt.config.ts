import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      failOnError: false
    }
  },
  app: {
    baseURL: '/sasaki/',
    cdnURL: '/sasaki/'
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    plugins: [vuetify()], // ← これがないと ".css" エラーになります！
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
        },
        highlight: {
          theme: 'github-light'
        }
      }
    }
  },
  i18n: {
    locales: [
      { code: 'ja', iso: 'ja-JP', file: 'ja.json', name: '🇯🇵日本語' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: '🇬🇧English' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/'
  },
  compatibilityDate: '2025-06-28',
})
