<template>
  <div id="login-wrapper" class="text-center jumbotron">
    <div>
      <h1 class="h3 mb-3 font-weight-normal">VueDiary_HeoJeeHaeng</h1>
    </div>
    <div>
      <label for="id">사용자 id</label>
      <input
        class="form-control"
        id="id"
        ref="id"
        type="text"
        @keyup.enter="loginUser"
        placeholder="아이디를 2글자 이상 입력하세요."
      />
    </div>
    <div>
      <button class="btn btn-lg btn-light btn-block" @click="loginUser">로-그인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  // mounted:: 화면 접속 시, input 엘레먼트로 포커싱
  //            DOM 객체를 만져야 하기 때문에, mounted hook 사용
  mounted() {
    this.$refs.id.focus();
  },
  methods: {
    loginUser() {
      let inputId = this.$refs.id.value;
      if (inputId.length < 2) {
        alert("아이디는 2글자 이상으로 입력해주세요.");
        this.$refs.id.focus();
        return;
      }
      // state.id 세팅
      this.$store.dispatch("loginUser", { id: inputId });

      this.$router
        .push({
          name: "list",
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
#login-wrapper {
  background-color: seagreen;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px gray solid;
  margin-left: -200px;
  margin-top: -230px;
}
div {
  margin: 10px;
}
</style>
