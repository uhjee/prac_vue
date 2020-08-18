<template>
  <div id="app">
    <h2>현재 저장된 아이디는 {{ id }} 입니다.</h2>
    <div class="box box-input">
      <div>
        <input id="input-id" type="text" ref="input" @keyup.enter="addId" />
        <button @click="addId">mutation</button>
      </div>
    </div>
    <div id="container">
      <div class="box-route" @click="moveTo('home')">
        home-component
      </div>
      <div class="box-route" @click="moveTo('profile')">
        profile-component
      </div>
      <div class="box-route" @click="moveTo('contacts')">
        contacts-component
      </div>
    </div>
    <!-- 호출할 route 표시되는 곳 -->
    <router-view></router-view>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "App",
  // 페이지에 virtual Dom이 생성되면, id input에 자동으로 포커스
  mounted() {
    this.$refs.input.focus();
  },
  computed: mapState(["id"]),
  methods: {
    addId() {
      let val = this.$refs.input.value;
      // 액션으로 전송
      this.$store.dispatch("addId", { id: val });
      // home으로 routing
      this.moveTo("home");
      // input element 안의 내용 비워주기
      this.$refs.input.value = "";
    },
    // parameter로 받는 route로  routing 시켜주는 메소드
    moveTo(routeName) {
      this.$router
        .push({
          name: routeName,
          params: {
            id: this.id
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.box-route {
  display: inline-block;
  border: 1px solid gray;
  margin: 15px;
  padding: 10px;
  background-color: lightgray;
}
</style>
