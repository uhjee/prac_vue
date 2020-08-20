<template>
  <div id="error-box" class="text-center row align-items-center">
    <div id="message-box" class="col">
      <div class="h2">요청이 잘못되었습니다.</div>
      <div style="color: gray; margin-bottom: 20px;">로그인 화면으로 이동합니다.</div>
      <div style="color: gray; margin-bottom: 20px; font-size: 30px">{{secondToMove}}</div>
      <button class="btn btn-secondary btn-sm" @click="moveToLogin">로그인</button>
    </div>
  </div>
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
#error-box {
  border: 3px solid seagreen;
  height: 250px;
  width: 600px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -300px;
  margin-top: -125px;
}
#message-box {
  color: seagreen;
}
</style>