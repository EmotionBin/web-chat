import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import md5 from 'md5'
import './styles/index.scss'
import request from '@/utils/request'
import utils from '@/utils'

Vue.use(Element)

// 原型链挂载
Vue.prototype.$request = request
Vue.prototype.$md5 = md5
Vue.prototype.$utils = utils

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
