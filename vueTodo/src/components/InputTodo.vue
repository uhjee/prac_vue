<template>
  <div>
    <input type="text" class="input" v-model.trim="todo" />
    <button class="btn" @click="addTodo">추가</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "inputTodo",
  data() {
    return {
      todo: ""
    };
  },
  methods: {
    addTodo() {
      // store의 action('addTodo')를 호출, payload의 property로 넣어줄 data
      this.$store.dispatch("addTodo", { todo: this.todo });
    }
  }
};
</script>

<style></style>
