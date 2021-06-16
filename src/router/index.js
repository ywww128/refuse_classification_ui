import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import("../views/main.vue")
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/explain',
    name: 'explain',
    component: () => import("../views/explain.vue")
  },
  {
    path: '/*',
    component: () => import("../views/404.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: '/dist/',
  routes
})

export default router
