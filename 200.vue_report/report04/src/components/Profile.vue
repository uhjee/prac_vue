<template>
  <div>
    <h3>Profile Component 입니다.</h3>
  </div>
</template>

<script>
export default {
  name: "profile",
  //   네비게이션 보호, 접근 권한 체크
  beforeRouteEnter(to, from, next) {
    if (!from.params.id) {
      alert("로그인부터 하셔야 해요.");
      return;
    }
    next();
  }
};
</script>

<style></style>
