<template>
  <router-view />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './assets/css/root.css'
import './assets/css/fonts.css'
import './assets/css/html.css'
import './assets/css/style.css'

// Analytics
import '@/assets/js/pixel.js'

// Útil
import { isDevMode } from './util'

export default {
  name: 'App',
  components: {},
  mounted() {
    if (!isDevMode()) {
      this.$analytics.fbq.event('PageView')
    }
  },
}
</script>
