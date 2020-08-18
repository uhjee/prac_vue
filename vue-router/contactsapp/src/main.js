// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

// 저수준 axios 예제
// import App from './AppAxiosTest'

// axios를 모든 Vue 인스턴스 내부에서 직접 import 하지 않아도 this.$axios를 통해 사용할 수 있다
// this.$axios.get() 같은 식으로 사용 가능
// 오직 main.js에서만 사용 가능
import axios from 'axios';

import VueRouter from 'vue-router';

import Home from './components/Home';
import About from './components/About';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import UpdatePhoto from './components/UpdatePhoto';

// Vue 객체 prototype에 axios 지정 -> 모든 Vue Instance 공유 가능
Vue.prototype.$axios = axios;

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  // 라우트 들 명시
  routes: [{
      // 기본페이지로 설정할 것이기 때문에  path를 '/' 으로 설정
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactList,
      // children 속성을 이용한 중첩 라우트
      children: [{
        path: 'add',
        name: 'addcontact',
        component: ContactForm
      }, {
        path: 'update/:no',
        name: 'updatecontact',
        component: ContactForm,
        props: true
      }, {
        path: 'photo/:no',
        name: 'updatephoto',
        component: UpdatePhoto,
        props: true
      }]
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
