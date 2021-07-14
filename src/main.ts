import { createApp } from 'vue'
import { createGtm } from '@gtm-support/vue-gtm'
import App from './App.vue'
import router from './router'

// Vue Loading
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

// Google
import VueGtag from 'vue-gtag'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)

app.use(VueLoading, {
  color: 'var(--cor-destaque)',
  backgroundColor: '#FFFF',
  loader: 'dots',
  opacity: 1,
})

// Configurações
import { config } from './config'
const CONFIG_PROMISE = config()

Promise.all([CONFIG_PROMISE]).then(resultado => {
  const resposta = resultado.pop()
  const CONFIG_TAGS = resposta

  app.use(VueReCaptcha, {
    siteKey: CONFIG_TAGS.reCaptcha,
    loaderOptions: {
      useRecaptchaNet: true,
      autoHideBadge: true,
    },
  })

  if (process.env.NODE_ENV !== 'development') {
    app.use(VueGtag, { config: { id: CONFIG_TAGS.gtag } }, router)
    app.use(
      createGtm({
        id: CONFIG_TAGS.gtm,
        compatibility: false,
        nonce: '2726c7f26c',
        debug: true,
        loadScript: true,
        vueRouter: router,
        trackOnNextTick: false,
      })
    )
  }
})

import titleMixin from './mixins/title'
app.mixin(titleMixin)

app.mount('#app')

