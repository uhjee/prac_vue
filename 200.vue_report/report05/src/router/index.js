import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import List from '../components/List.vue'
import ListTable from '../components/Listtable.vue'
import Detail from '../components/Detail.vue'
import Write from '../components/Write.vue'
import Diary from '../components/Diary.vue'
import NotFound from '../components/NotFound.vue'

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
    // name: 'diary',
    redirect: {
      // name: 'list'
      name: 'list'
    },
    component: Diary,
    // 중첩 라우팅을 위해 children에 하위 route 등록
    children: [{
        path: '/diary/list',
        name: 'list',
        component: List,
        props: true
      },
      {
        path: '/diary/listtable',
        name: 'listtable',
        component: ListTable,
        props: true
      },
      {
        path: '/diary/write',
        name: 'write',
        component: Write,
        props: true
      },
      {
        // parameter 숫자만 받도록 정규식 처리
        path: '/diary/:no(\\d+)',
        name: 'detail',
        component: Detail,
        props: true
      },

    ]
  },
  // 네비게이션 보호 : 사용자가 엉뚱한 경로로 유입되는 것 방지
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  }

];

export default new Router({
  routes: routes,

})
