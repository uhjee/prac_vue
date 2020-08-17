import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// vue-router를 애플리케이션에서 사용할 수 있도록
Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(App)
})
