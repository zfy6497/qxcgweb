// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router/index'
import './assets/css/main.css'
import './assets/css/base.css'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
