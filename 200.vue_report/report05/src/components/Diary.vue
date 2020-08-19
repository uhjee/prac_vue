<template>
  <div>
    <div id="navbar-container">
      <navbar></navbar>
    </div>
    <div id="diary-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from "./Navbar";

export default {
  name: "diary",
  components: { navbar },
  // 로그인을 통해 들어오지 않는다면(store에 id 가 저장되지 않았다면), 다시 리디렉션 (네비게이션 보호)
  beforeRouteEnter(to, from, next) {
    next((app) => {
      if (!app.$store.state.id) {
        alert("로그인부터 하셔야 해요.");
        next("/");
        return;
      }
    });
  },
};
</script>

<style scoped>
#diary-container {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
