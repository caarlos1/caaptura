import { createApp } from 'vue'
import { createGtm } from '@gtm-support/vue-gtm'
import App from './App.vue'
import router from './router.js'

// Google
import VueGtag from 'vue-gtag'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import axios from 'axios'
import VueAxios from 'vue-axios'

// Informações de Configuração
import CONFIG from '../data/config.json'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)

app.use(VueReCaptcha, {
  siteKey: CONFIG.reCaptcha,
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true,
  },
})

if (!process.env.NODE_ENV === 'development') {
  app.use(VueGtag, { config: { id: CONFIG.gtag } }, router)
  app.use(
    createGtm({
      id: CONFIG.gtm,
      compatibility: false,
      nonce: '2726c7f26c',
      debug: true,
      loadScript: true,
      vueRouter: router,
      trackOnNextTick: false,
    })
  )
}

import titleMixin from './mixins/title'
app.mixin(titleMixin)

app.mount('#app')
