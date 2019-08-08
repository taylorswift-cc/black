import Vue from 'vue'
import App from './App.vue'

import axios from '@/api'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'

import myPlugin from '@/components'

import '@/styles/index.less'

Vue.use(myPlugin)
Vue.use(elementUi)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
