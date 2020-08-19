import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import List from '../components/List.vue'
import Detail from '../components/Detail.vue'
import Write from '../components/Write.vue'
import Diary from '../components/Diary.vue'

Vue.use(Router)

const routes = [
  // 기본 화면 리디렉션..
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/diary',
    name: 'diary',
    component: Diary,
    children: [{
        path: '/diary/list',
        name: 'list',
        component: List,
        props: true
      },
      {
        path: '/diary/write',
        name: 'write',
        component: Write,
        props: true
      },
      {
        path: '/diary/:no',
        name: 'detail',
        component: Detail,
        props: true
      },

    ]
  }

];

export default new Router({
  routes: routes
})
