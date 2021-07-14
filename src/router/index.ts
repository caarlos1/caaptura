import { createWebHistory, createRouter } from 'vue-router'
import Principal from '@/views/Principal.vue'

const routes = [
  {
    path: '/',
    component: Principal,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
