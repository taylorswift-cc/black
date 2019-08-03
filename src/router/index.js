import VueRouter from 'vue-router'
import Vue from 'vue'

import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    { path: '/login', name: login, component: login },
    { path: '/', name: home, component: home }
  ]
})

export default router
