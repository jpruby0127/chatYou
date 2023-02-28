import Vue from 'vue'
import App from './App'
import request from './common/request.js'
import store from './store'

Vue.prototype.$request = request
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
