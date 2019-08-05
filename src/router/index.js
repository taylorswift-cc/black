import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store/store.js'

import login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import welcome from '@/views/welcome/welcome.vue'
import article from '@/views/article/article.vue'
import image from '@/views/image/image.vue'
import publish from '@/views/publish/publish.vue'
import comment from '@/views/comment/comment.vue'
import fans from '@/views/fans/fans.vue'
import setting from '@/views/setting/setting.vue'
import notFound from '@/components/notFound.vue'
Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    {
      path: '/',
      component: home,
      children: [
        { path: '', name: welcome, component: welcome },
        { path: 'article', component: article },
        { path: 'image', component: image },
        { path: 'publish', component: publish },
        { path: 'comment', component: comment },
        { path: 'fans', component: fans },
        { path: 'setting', component: setting }
      ]
    },
    { path: '*', component: notFound }
  ]
})
router.beforeEach((to, form, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
