// 상단에 user 수 만큼 호출되어 username을 보여줄 컴포넌트
<template>
  <div class="users">
    <div class="users-wrapper">
      <!-- 유저 이름에 클릭 이벤트 등록 -->
      <div class="users-name" @click="showDetails">
        <!-- 부모 컴포넌트에게 html tag 및 data 받기 위한 named slot -->
        <slot name="user-name"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  // props에 대해 초기 설정을 할 수 있다.
  // 이번에는 props 대신 slot 사용해서 html tag와 data 받는다
  // props: {
  //   userName: {
  //     type: String,
  //     default: "",
  //   },
  // },
  methods: {
    showDetails() {
      // 부모 component(App.vue)에게 사용자 정의 이벤트(nameclick)에 대한  핸들러 요청
      this.$emit("nameclick");
    },
  },
};
</script>

<style scoped>
.users {
  display: inline-block;
  background-color: darkgreen;
  color: white;
  text-align: center;
  width: 70px;
  height: 70px;
  margin: 10px;
  padding: 10px;
  font-size: 14px;
}

.users-wrapper {
  display: table;
  width: 100%;
  height: 100%;
}
.users-name {
  word-break: break-all;
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  cursor: pointer;
}
.users-name:hover {
  font-size: 17px;
  font-weight: bold;
}
</style>
