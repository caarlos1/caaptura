import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

// Analytics
import VueGtag from 'vue-gtag'
import VueFacebookPixel from 'vue-facebook-pixel'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)

app.use(VueReCaptcha, {
  siteKey: '6Ld3cd0UAAAAAEtD4rnSFxLQjJTMRM-J-aGfkMnK',
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true,
  },
})

if (!process.env.NODE_ENV === 'development') {
  app.use(VueGtag, { config: { id: 'G-SYL7H9RVB4' } }, router)
  app.use(VueFacebookPixel)
  app.analytics.fbq.init('1850043178484496')
}

import titleMixin from './mixins/title'
app.mixin(titleMixin)

app.mount('#app')
