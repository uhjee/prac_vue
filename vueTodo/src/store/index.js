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
        text: '누워있기',
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
        registAt: '2020.08.09',
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
      //   알겠다.. 끝나고 모달창 끄는 역할.
      state.mode = 'add';
      state.currentView = null;
    },
    updateTodo: (state, payload) => {
      state.todo = payload.todo;
      state.todoList[state.todo.no - 1].text = state.todo.text;

      //   왜 있는지 모르겠다 
      //   알겠다.. 끝나고 모달창 끄는 역할.
      state.mode = 'add';
      state.currentView = null;
    },
    changeView: (state, payload) => {
      state.currentView = 'todoForm';
      state.mode = payload.mode;
    },
    cancelView: state => {
      state.currentView = null;
      state.mode = '';

    },
    getTodo: (state, payload) => {
      state.todo = state.todoList[payload.no - 1];
    },
    deleteTodo: (state, payload) => {
      console.log(payload);
      state.todoList.filter(t => {
        if (t.no != payload.no) {
          return;
        }
        return t.in
      })
      state.todoList.splice(payload.no, 1);
    }
  },
  actions: {
    addTodo: (store, payload) => {
      if (payload.text.length < 2) {
        alert('2글자 이상 입력해주세요.')
        return;
      }
      store.commit('addTodo', payload);
    },
    updateTodo: (store, payload) => {
      if (payload.todo.text.length < 2) {
        alert('2글자 이상 입력해주세요.')
        return;
      }
      store.commit('updateTodo', payload);
    },
    changeView: (store, payload) => {
      store.commit('changeView', payload);
    },
    cancelView: store => {
      store.commit('cancelView');
    },
    updateForm: (store, payload) => {
      store.commit('getTodo', payload);
      store.commit('changeView', payload);
    },
    deleteTodo: (store, payload) => {
      store.commit('deleteTodo', payload);
    }
  },
  getters: {
    copyTodo: state => {
      const a = Object.assign({}, state.todo);
      return a;
      //   return JSON.parse(JSON.stringify(state.todo));
    }
  }
})



export default store;
