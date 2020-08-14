<template>
  <div class="modal">
    <div class="form">
      <h3 class="heading">add</h3>
      <div class="form-group">
        <label>To do</label>
        <input
          type="text"
          class="input"
          ref="input"
          @keyup.enter="addTodoHandler"
        />
      </div>
      <div class="form-group">
        <input type="button" class="btn" value="추가" @click="addTodoHandler" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "inputTodo",
  methods: {
    addTodoHandler() {
      console.log(this.$refs.input);
      let val = this.$refs.input.value;
      // store의 action('addTodo')를 호출, payload의 property로 넣어줄 data
      this.$store.dispatch("addTodo", { text: val });
    },
  },
  computed: {
    mapState,
  },
};
</script>

<style></style>
