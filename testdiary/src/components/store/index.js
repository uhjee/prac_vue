import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    id: '',
    diary: {
      no: 0,
      writer: '',
      content: '',
      writeat: ''
    },
    diarylist: [{
        no: 1,
        writer: 'jee',
        content: '난 오늘 너무 더웠다..',
        writeat: '2020.08.01'
      },
      {
        no: 2,
        writer: 'min',
        content: '지겨운 장마가 끝나버렸다...그토록 싫었던 비가 그립다..',
        writeat: '2020.08.02'
      },
      {
        no: 3,
        writer: 'jee',
        content: 'vue를 배웠다.. 재미가 있었다.',
        writeat: '2020.08.07'
      },
      {
        no: 4,
        writer: 'jee',
        content: '너무 더워서 더위사냥을 사먹어버렸다.',
        writeat: '2020.08.08'
      },
      {
        no: 5,
        writer: 'haeng',
        content: '집에서 영화를 보았다.',
        writeat: '2020.08.09'
      }
    ]
  },
  mutations: {
    loginUser: (state, payload) => {
      state.id = payload.id;
    }
  },
  actions: {
    loginUser: (store, payload) => {
      store.commit('loginUser', payload);
    }

  },
  getters: {

  }
})
