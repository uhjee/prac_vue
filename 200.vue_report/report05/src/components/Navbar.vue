<template>
  <el-menu
    mode="horizontal"
    :default-active="activeIndex"
    @select="handleSelect"
    background-color="#2e8b57"
    text-color="#f8f8ff"
    active-text-color="#ff7847"
  >
    <el-menu-item index="1">
      <span @click="moveToList">Vue_diary_Heojeehaeng</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">Diary</template>
      <el-menu-item index="2-1">리스트</el-menu-item>
      <el-menu-item index="2-2">다이어리 쓰기</el-menu-item>
    </el-submenu>
    <el-menu-item style="float: right;" index="3">
      <span style="color: 'gray'; marginRight: '10px'; fontSize: '13px'">
        <el-avatar>{{ id }}</el-avatar>
        <span id="navbar-text-id">{{ id }}</span> 님 환영합니다.
      </span>
      <el-button size="small" type="warning" @click="openMessageBox">logout</el-button>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      activeIndex: "1",
    };
  },
  computed: mapState(["id"]),
  methods: {
    handleSelect(key, keyPath) {},
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
    //에러메세지:  Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current
    moveToList() {
      this.$router.push({ name: "list" }).catch((error) => {
        // console.log(error);
      });
    },
    openMessageBox() {
      this.$confirm(
        `${this.$store.state.id} 님, 로그아웃하시겠어요?`,
        "Logout",
        {
          confirmButtonText: "네",
          cancelButtonText: "아니요",
          type: "warning",
        }
      )
        .then(() => {
          this.logout();
          this.$message({
            type: "success",
            message: "로그아웃 완료!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "로그아웃 취소되었습니다.",
          });
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
#navbar-text-id {
  font-weight: bolder;
  color: tomato;
}
</style>
