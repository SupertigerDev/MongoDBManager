import Vue from 'vue'
import VueRouter from 'vue-router'
import Connect from '../views/Connect.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Connect',
    component: Connect
  },
  {
    path: '/main',
    name: 'Main',

    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue')
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
