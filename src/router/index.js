import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router