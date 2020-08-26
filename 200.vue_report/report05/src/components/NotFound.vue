<template>
  <el-container class="container-404 background-theme">
    <div class="message-box">
      <div class="title">요청이 잘못되었습니다.</div>
      <div class="content">로그인 화면으로 이동합니다.</div>
      <div class="second-text">{{secondToMove}}</div>
      <button class="btn-login" @click="moveToLogin">로그인</button>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "notfound",
  data() {
    return {
      // (property) 초 만큼 NotFound 화면을 보여주고, 로그인화면으로 이동
      secondToMove: 5,
    };
  },
  // life cycle hook - mounted: DOM 구성이 되고 setInterval로 타이머
  mounted() {
    // 로그아웃시킨다.
    this.logout();

    // 5초 뒤, 로그인 화면으로 라우팅
    let interval = setInterval(() => {
      if (this.secondToMove == 0) {
        clearInterval(interval);
        this.moveToLogin();
      }
      this.reduceSecond();
    }, 1000);
  },
  methods: {
    // data의 secondToMove 변경
    reduceSecond() {
      this.secondToMove--;
    },
    // 로그인 화면으로 라우팅
    moveToLogin() {
      // setInterval 종료를 위해, property 변경
      this.secondToMove = 0;
      this.$router
        .push({
          name: "login",
        })
        .catch((error) => {
          // console.log(error);
        });
    },
    // 로그아웃 action 호출
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.container-404 {
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.background-theme {
  background: #e1eec3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f05053,
    #e1eec3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f05053,
    #e1eec3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.message-box {
  background-color: white;
  width: 400px;
  height: 300px;
  padding: 30px 20px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.message-box .title {
  font-size: 30px;
  color: tomato;
}
.message-box .content {
  font-size: 20px;
  color: gray;
}
.message-box .second-text {
  font-size: 30px;
  color: tomato;
}
.btn-login {
  background-color: #fc7375;
  color: white;
  border: 1px solid #f8b4b5;
}
</style>