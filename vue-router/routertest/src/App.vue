<template>
  <div>
    <div class="header">
      <h1 class="headerText">(주) OpenSg</h1>
      <nav>
        <ul>
          <li>
            <!--하이퍼링크 생성 :: script의 routes의 path와 링크 연결-->
            <!-- <router-link to="/home">Home</router-link> -->
            <!-- 하이퍼링크 생성 :: routes 에 등록한 name 으로 .. -->
            <router-link v-bind:to="{name:'home'}">Home</router-link>
          </li>
          <li>
            <!-- <router-link to="/about">About</router-link> -->
            <router-link v-bind:to="{name:'about'}">About</router-link>
          </li>
          <li>
            <!-- <router-link to="/contacts">contacts</router-link> -->
            <router-link v-bind:to="{name:'contacts'}">contacts</router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="container">
      <!-- <router-view> 를 사용해서 등록한 router 표현 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Home from "./components/Home";
import About from "./components/About";
import Contacts from "./components/Contacts";

import ContactByNo from "./components/ContactByNo";

// VueRouter 참조하기 위해 import
import VueRouter from "vue-router";

// routing Mode가 history 일 때, 잘못된 경로 핸들링
import NotFound from "./components/NotFound";

const router = new VueRouter({
  mode: "history",
  // path와 실제 컴포넌트 간 매핑
  routes: [
    { path: "/", component: Home },
    { path: "/home", name: "home", component: Home },
    { path: "/about", name: "about", component: About },

    // { path: "/contacts", component: Contacts },
    // // 동적 라우트 구성.. 호출될 때마다 새로운 vueInstance 생성..
    // { path: "/contacts/:no", component: ContactByNo },
    {
      path: "/contacts",
      name: "contacts",
      component: Contacts,
      // 하나의 컴포넌트 내부에 포함되어 라우팅할 경우, (중첩 라우팅) 위의 컴포넌트 계속 뿌린다.
      children: [
        // {
        //   path: "/contacts/:no",
        //   name: "contactbyno",
        //   component: ContactByNo,
        //   // 라우트 수준의 네비게이션 보호
        //   beforeEnter: (to, from, next) => {
        //     console.log(`@@ beforeEnter! : ${from.path} --> ${to.path}`);
        //     if (from.path.startsWith("/contacts")) {
        //       next();
        //     } else {
        //       next("/home");
        //     }
        //     // next() 를 호출하지 않으면 네비게이션 진행이 되지 않는다.
        //   },
        // },
        {
          path: ":no",
          name: "contactbyno",
          component: ContactByNo,
          // props true인 경우, route.params 정보를 동일한 속성에 할당
          props: true,
        },
      ],
    },
    { path: "*", component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(`** beforeEach!!`);
  next();
});

router.afterEach((to, from) => {
  console.log(`** afterEach!!`);
});

export default {
  name: "app",

  //   router 인스턴스에 객체 정보 추가
  router,
};
</script>
<style>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
.header {
  background-color: aqua;
  padding: 10px 0px 0px 0px;
}
.headerText {
  padding: 0px 20px 0px 20px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: purple;
}
li {
  float: left;
}
li a {
  display: block;
  color: yellow;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: aqua;
  color: black;
}
</style>
