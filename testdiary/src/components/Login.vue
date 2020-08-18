<template>
  <div>
    <input id="id" ref="id" type="text" @keyup.enter="loginUser" />
    <button @click="loginUser">로그인</button>
  </div>
</template>

<script>
export default {
  name: "login",
  methods: {
    loginUser() {
      let inputId = this.$refs.id.value;
      console.log(inputId);
      this.$store.dispatch("loginUser", { id: inputId });
    }
  }
};
</script>

<style></style>
