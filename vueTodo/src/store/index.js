import Vue from 'vue';
import Vuex from 'vuex';
import _Util from '../util';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentView: null,
    mode: 'add',
    todo: {
      no: 0,
      text: '',
      registAt: '',
      isDone: false
    },
    todoList: [{
        no: 1,
        text: '행복하기',
        registAt: '2020.07.18',
        isDone: false
      },
      {
        no: 2,
        text: '공부하기',
        registAt: '2020.07.19',
        isDone: false
      },
      {
        no: 3,
        text: '운동하기',
        registAt: '2020.07.26',
        isDone: false
      },
      {
        no: 4,
        text: '모니터 받침대 사기',
        registAt: '2020.08.01',
        isDone: false
      },
      {
        no: 5,
        text: '비타민 사기',
        registAt: '2020.08.05',
        isDone: false
      },
      {
        no: 6,
        text: '학자금 대출 갚기',
        registAt: '2020.08.14',
        isDone: false
      }

    ]
  },
  mutations: {
    addTodo: (state, payload) => {
      let inputTodo = {
        no: state.todoList.length + 1,
        text: payload.text,
        registAt: _Util.getTodayDate(),
        isDone: false
      }

      state.todoList.push(inputTodo);

      //   왜 있는지 모르겠다 
      //   state.mode = 'add';
      // state.currentView = 'contactForm';
    },
    updateTodo: (state, payload) => {
      state.todo = payload.todo;

      //   왜 있는지 모르겠다 
      //   state.mode = 'update';
      // state.currentView = 'contactForm';
    }
  },
  actions: {
    addTodo: (store, payload) => {
      console.log('AddTodo action');
      console.log('AddTodo action payload: ' + payload);
      store.commit(addTodo, payload);
    }
  }
})



export default store;
