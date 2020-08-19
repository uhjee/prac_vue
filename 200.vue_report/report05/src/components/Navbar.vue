<template>
  <div id="navbar-wrapper">
    <nav class="navbar navbar-light bg-light border-bottom">
      <a class="navbar-brand">vue-diary-heojeehaeng</a>
      <div>
        <span
          class="navbar-text"
          :style="{ color: 'gray', marginRight: '10px', fontSize: '13px' }"
        >{{ id }} 님 환영합니다.</span>
        <button id="logout-btn" class="btn btn-sm my-2 my-sm-0" @click="logout">로그아웃</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  computed: mapState(["id"]),
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
#logout-btn {
  background-color: seagreen;
  color: white;
  font-size: 12px;
}
</style>
