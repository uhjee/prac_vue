<template>
  <div id="app">
    <div id="container">
      <div class="page-header">
        <h1 class="test-center">To do list</h1>
      </div>
      <component :is="currentView" :todo="todo"></component>
      <!-- <todolist></todolist> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import TodoForm from "./components/TodoForm";
export default {
  name: "App",
  data() {
    return {
      currentView: "add",
    };
  },
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
</style>
