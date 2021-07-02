import { createApp } from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router.js'

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

import titleMixin from './mixins/title'
app.mixin(titleMixin)

app.mount('#app')
