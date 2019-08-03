import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import elementUi from 'element-ui'
import router from '@/router'
Vue.use(elementUi)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
