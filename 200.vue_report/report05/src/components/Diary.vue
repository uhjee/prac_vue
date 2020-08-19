<template>
  <div>
    <div id="navbar-container">
      <!-- 네비게이션 바 component -->
      <navbar></navbar>
    </div>
    <div id="diary-container">
      <!-- /diary 하위의 route 들이 보여질 곳 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from "./Navbar";

export default {
  name: "diary",
  components: { navbar },
  //네비게이션 보호 :: 로그인을 통해 들어오지 않는다면(store에 id 가 저장되지 않았다면), 다시 리디렉션
  beforeRouteEnter(to, from, next) {
    // beforeRouteEnter() 등의 메소드는 Vue instance가 만들어 지기 전에 실행 -> this. 로 접근 불가하기 때문에 아래처럼 접근
    next(app => {
      if (!app.$store.state.id) {
        alert("로그인부터 하셔야 해요.");
        next("/");
        return;
      }
    });
  }
};
</script>

<style scoped>
#diary-container {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
