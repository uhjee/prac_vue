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
        isDone: true
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
        isDone: true
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
      // Arrays.findIndex() 매칭되는 index를 리턴한다.
      let matchIndex = state.todoList.findIndex(todo =>
        todo.no == payload.no
      )
      state.todo = state.todoList[matchIndex];
    },
    deleteTodo: (state, payload) => {
      console.log(payload.no);
      let matchIndex = state.todoList.findIndex(todo =>
        todo.no == payload.no
      )
      console.log(matchIndex);
      state.todoList.splice(matchIndex, 1);
    },
    changeChecked: (state, payload) => {
      let matchIndex = state.todoList.findIndex(todo =>
        todo.no == payload.no
      )
      state.todoList[matchIndex].isDone = !state.todoList[matchIndex].isDone;
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
    addForm: (store, payload) => {
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
    },
    changeChecked: (store, payload) => {
      store.commit('changeChecked', payload);
    }
  },
  getters: {
    copyTodo: state => {
      // vanilla javascript로 객체 복사하는 방법
      // lodash의 clone method도 있다
      const todo = Object.assign({}, state.todo);
      console.log(todo);
      return todo;
      //   return JSON.parse(JSON.stringify(state.todo));
    },
    todoList: state => {
      return state.todoList.filter(todo => todo.isDone === false)
    }
  }
})



export default store;
