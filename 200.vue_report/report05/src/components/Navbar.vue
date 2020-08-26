<template>
  <el-menu mode="horizontal" :default-active="activeIndex">
    <el-menu-item index="1">
      <div @click="moveToList">Vue_diary_Heojeehaeng</div>
    </el-menu-item>
    <el-menu-item class="info-login">
      <el-avatar class="margin-right-10">{{ id }}</el-avatar>
      <span>
        <div class="navbar-id-text margin-right-10">{{ id }}</div>님 환영합니다.
      </span>
      <el-popconfirm
        confirmButtonText="네"
        cancelButtonText="아니에요"
        confirmButtonType="danger"
        cancelButtonType="plain"
        icon="el-icon-info"
        iconColor="red"
        title="정말 로그아웃하실 건가요?"
        @onConfirm="logout"
      >
        <el-button class="btn-logout margin-left-10" slot="reference">Sign out</el-button>
      </el-popconfirm>
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
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
      this.$message({
        type: "info",
        message: "로그아웃 완료!",
      });
    },
    //에러메세지:  Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current
    moveToList() {
      this.$router.push({ name: "list" }).catch((error) => {
        // console.log(error);
      });
    },
    openLogoutMessageBox() {
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
.el-menu {
  background: #e1eec3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f05053,
    #e1eec3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff4b4e,
    #ffcf91
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.el-menu--horizontal > .el-menu-item {
  color: white;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid white;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  color: #ff4b4e;
  font-size: 14px;
  font-weight: bold;
  background-color: #ffcf91;
}
.info-login {
  float: right;
}
.navbar-id-text {
  font-weight: bolder;
  display: inline-block;
}
.el-avatar {
  background-color: #fc7375;
  border: 1px solid rgb(255, 201, 185);
}
.btn-logout {
  color: #ff4b4e;
}
.margin-right-10 {
  margin-right: 10px;
}
.margin-left-10 {
  margin-left: 10px;
}
</style>
