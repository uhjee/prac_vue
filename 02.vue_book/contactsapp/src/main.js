// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import App from './AppAxiosTest'

// axios를 모든 Vue 인스턴스 내부에서 직접 import 하지 않아도 this.$axios를 통해 사용할 수 있다
// this.$axios.get() 같은 식으로 사용 가능
// 오직 main.js에서만 사용 가능
import axios from 'axios';
Vue.prototype.$axios = axios;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
