import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/app1',
    name: 'app1',
    component : () => import('app1/app')
  },
  {
    path: '/app2',
    name: 'app2',
    component : () => import('app2/app')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
