<template>
  <div>
    <p class="addNew">
      <button class="btn btn-success btn-add float-right" @click="addForm">
        할 일 추가
      </button>
    </p>
    <div id="example">
      <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>완료여부</th>
            <th>할 일</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody id="todos">
          <tr v-for="(todo, index) in todoList" :key="index">
            <td>
              <input type="checkbox" name="" />
              {{ todo.isDone }}
            </td>
            <td class="todo-text">
              <span>
                {{ todo.text }}
              </span>
              <button class="btn btn-xs" @click="updateForm(todo.no)">
                수정
              </button>
              <button class="btn btn-xs" @click="deleteTodo(todo.no)">
                삭제
              </button>
            </td>
            <td>{{ todo.registAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "todolist",
  computed: mapState({
    todoList: "todoList"
  }),
  methods: {
    addForm() {
      //   console.log(a);
      this.$store.dispatch("changeView", { mode: "add" });
    },
    updateForm(no) {
      this.$store.dispatch("updateForm", {
        mode: "update",
        no: no
      });
    },
    deleteTodo(index) {
      this.$store.dispatch("deleteTodo", { no: index - 1 });
    }
  }
};
</script>

<style scoped></style>
