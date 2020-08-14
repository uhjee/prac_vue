<template>
  <div id="app">
    <div id="container">
      <div class="page-header">
        <h1 class="test-center">To do list</h1>
      </div>
      <component :is="currentView" :todo="todo"></component>
      <todolist></todolist>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import { mapState } from "vuex";

import TodoForm from "./components/TodoForm";
import Todolist from "./components/TodoList";

export default {
  name: "App",
  components: {
    TodoForm,
    Todolist,
  },
  computed: mapState({
    currentView: "currentView",
    todo: "todo",
  }),
};
</script>

<style>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  margin-top: 60px;
}
</style>
