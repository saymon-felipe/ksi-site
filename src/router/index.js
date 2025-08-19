import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue' 
import admin from '../views/admin.vue' 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: admin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router