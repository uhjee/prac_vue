<template>
  <div class="modal">
    <div class="form" @keyup.esc="cancelEvent">
      <h3 class="heading">{{ headingText }}</h3>
      <div class="form-group">
        <label>To do</label>
        <div id="regist-date" v-if="this.mode == 'update'">
          {{ copyTodo.registAt }}에 작성된 할 일
        </div>
        <input
          v-if="this.mode == 'add'"
          type="text"
          class="input"
          ref="input"
          @keyup.enter="submitEvent"
        />
        <input
          v-if="this.mode == 'update'"
          type="text"
          class="input"
          ref="input"
          v-model="copyTodo.text"
          @keyup.enter="submitEvent"
        />
      </div>
      <div class="form-group">
        <input
          type="button"
          class="btn"
          :value="btnText"
          @click="submitEvent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "todoForm",
  mounted() {
    this.$refs.input.focus();
  },

  computed: _.extend(
    {
      btnText() {
        if (this.mode != "update") return "추가하기";
        else return "수정하기";
      },
      headingText() {
        if (this.mode != "update") return "할 일 추가하기";
        else return "할 일 변경하기";
      },
    },
    mapState({
      mode: "mode",
    }),
    mapGetters({
      copyTodo: "copyTodo",
    })
  ),
  methods: {
    submitEvent() {
      if (this.mode != "update") {
        // console.log(this.$refs.input);
        let val = this.$refs.input.value;
        // store의 action('addTodo')를 호출, payload의 property로 넣어줄 data
        this.$store.dispatch("addTodo", { text: val });
        this.$refs.input.value = "";
      } else {
        this.$store.dispatch("updateTodo", { todo: this.copyTodo });
      }
    },
    cancelEvent() {
      this.$store.dispatch("cancelView");
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.form {
  background-color: white;
  margin: 100px auto;
  max-width: 400px;
  min-width: 200px;
  font: 13px "verdana";
  padding: 10px 10px 10px 10px;
}
.form div {
  padding: 0;
  display: block;
  margin: 10px 0 0 0;
}
.form label {
  text-align: center;
  margin: 0 0 3px 0;
  padding: 0px;
  display: block;
  font-weight: bold;
}
#regist-date {
  margin-bottom: 10px;
  color: slategray;
}
.form input,
textarea,
select {
  box-sizing: border-box;
  border: 1px solid #bebebe;
  padding: 7px;
  margin: 0px;
  outline: none;
}
.form .long {
  width: 100%;
}
.form .button {
  background: #2b798d;
  padding: 8px 15px 8px 15px;
  border: none;
  color: #fff;
}
.form .button:hover {
  background: #4691a4;
}
.form .heading {
  background: #33a17f;
  font-weight: 300;
  text-align: left;
  padding: 20px;
  color: #fff;
  margin: 5px 0 30px 0;
  padding: 10px;
  min-width: 200px;
  max-width: 400px;
}
</style>
