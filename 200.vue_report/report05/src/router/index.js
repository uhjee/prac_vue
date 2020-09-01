import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import List from '../components/List.vue'
import Detail from '../components/Detail.vue'
import DiaryForm from '../components/DiaryForm.vue'
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
    redirect: {
      name: 'list'
    },
    component: Diary,
    // 중첩 라우팅을 위해 children에 하위 route 등록
    children: [{
        // list (목록 보기)
        path: '/diary/list',
        name: 'list',
        component: List,
        props: true
      },
      // detail (상세보기)
      {
        // parameter 숫자만 받도록 정규식 처리
        path: '/diary/:no(\\d+)',
        name: 'detail',
        component: Detail,
        props: true
      },
      // write
      {
        path: '/diary/write',
        name: 'write',
        component: DiaryForm,
        props: true
      },
      // update
      // path는 Detail과 동일 / component는 write와 동일
      {
        path: '/diary/:no(\\d+)',
        name: 'update',
        component: DiaryForm,
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
