const modules = [
  // '@nuxtjs/proxy',
]

if (process.env.NODE_ENV === 'production') {
  modules.push('@nuxtjs/pwa')
}

module.exports = {
  // Headers of the page
  head: {
    title: 'Veh',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'Nuxt.js project' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'theme-color', content: '#0ff5' },
      { name: 'fragment', content: '!' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'msapplication-TileImage', content: 'wecan_logo.png' },
      { name: 'msapplication-TileColor', content: '#da532c' },
    ],
    link: [
      { rel: 'shortcut icon', href: '/icon/veh.PNG' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon/veh.PNG' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/veh.PNG' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/veh.PNG' },
      { rel: 'mask-icon', href: '/icon/veh.PNG', color: '#5bbad5' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
      { rel: 'stylesheet', type: 'text/css', href: 'iconfont/material-icons.css' },
      // { rel: 'stylesheet', type: 'text/css', href: 'iconfont/font-awesome.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'css/fontawesome-free/css/all.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'css/cv_style.css?v=1002' },
    ],
  },

  // Global CSS
  css: [
    // { src: '~/assets/scss/main.scss', lang: 'scss' },
  ],

  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: '#1e62ab',
  },

  server: {
    port: 9006,
  },

  // Build options
  mode: 'spa',

  render: {
    resourceHints: false,
  },

  router: {
    mode: 'hash',
  },

  // build: {
  //   analyze: process.env.NODE_ENV !== 'production',
  //   // maxChunkSize: 500000,
  //   extractCSS: true,
  //   publicPath: process.env.NODE_ENV !== 'production' ? '/_nuxt/' : 'nuxt/',
  //   distDir: 'www',
  //   // vendor: [
  //   //   // 'axios',
  //   //   'vuetify',
  //   // ],
  // },

  plugins: [
    // '~/plugins/cordova',
    '~/plugins/vuetify',
    '~/plugins/axios',
  ],

  // generate: {
  //   dir: 'www',
  // },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',

  ],
  proxy: {
    '/api': process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:34001' : 'http://api:34001',
    '/files': process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:34001' : 'http://api:34001',
    ws: true,
  },
}
