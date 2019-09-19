// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './css/main.css'
// import { DatePicker, Select } from 'element-ui'
import ElementUI from 'element-ui'
import store from '../src/store'

Vue.config.productionTip = false
// Vue.use(DatePicker)
// Vue.use(Select)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
