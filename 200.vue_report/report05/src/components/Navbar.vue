<template>
  <div id="navbar-wrapper">
    <nav class="navbar navbar-light bg-light border-bottom fixed-top">
      <a id="navbar-brand" class="navbar-brand" @click="moveToList">VueDiary_heojeehaeng</a>
      <div>
        <span class="navbar-text" :style="{ color: 'gray', marginRight: '10px', fontSize: '13px' }">
          <span id="navbar-text-id">{{ id }}</span> 님 환영합니다.
        </span>
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
      if (confirm("로그아웃 하시겠어요?")) {
        this.$store.dispatch("logout");
        this.$router.push({ name: "login" });
      }
    },
    //에러메세지:  Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current
    moveToList() {
      this.$router.push({ name: "list" }).catch((error) => {
        // console.log(error);
      });
    },
  },
};
</script>

<style scoped>
#navbar-brand {
  cursor: pointer;
}
#navbar-brand:hover {
  color: forestgreen;
}
#navbar-wrapper {
  margin-bottom: 40px;
}
#logout-btn {
  background-color: seagreen;
  color: white;
  font-size: 12px;
}
#navbar-text-id {
  font-weight: bolder;
}
</style>
