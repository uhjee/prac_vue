import Vue from 'vue';
import Vuex from 'vuex';
import DateUtil from '../dateutil'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    id: '',
    diary: {
      no: 0,
      title: '',
      content: '',
      writer: '',
      writeat: ''
    },
    diarylist: [{
        no: 1,
        writer: 'jee',
        title: '05일기장 제목 01',
        content: '난 오늘 \n\n\n\n\n너무 더웠다..',
        writeat: '2020년 08월 01일'
      },
      {
        no: 2,
        writer: 'min',
        title: 'diary title 02',
        content: 'the rainy days is over... \n\n\n\n\nbut im so hot..\n\n 지겨운 장마가 끝나버렸다...그토록 싫었던 비가 그립다..',
        writeat: '2020년 08월 02일'
      },
      {
        no: 3,
        writer: 'jee',
        title: '01일기장 제목 03',
        content: 'vue를 배웠다.. \n\n\n재미가 있었다.',
        writeat: '2020년 08월 07일'
      },
      {
        no: 4,
        writer: 'jee',
        title: '일기장 제목 05',
        content: '너무 더워서....\n\n\n\n 나는 더위사냥을 사먹어버렸다.',
        writeat: '2020년 08월 08일'
      },
      {
        no: 5,
        writer: 'haeng',
        title: '일기장 제목 04',
        content: '집에서 영화를 \n\n\n\n\n\n보았다.',
        writeat: '2020년 08월 09일'
      }
    ]
  },
  mutations: {
    loginUser: (state, payload) => {
      state.id = payload.id;
    },
    logout: (state) => {
      state.id = '';
    },
    // diary.no 로 하나의 diary 를 찾아 state에 넣어두는 mutation
    setDirayOne: (state, payload) => {
      let arr = state.diarylist.filter((d) => d.no == payload.no);
      state.diary = arr[0];
    },
    deleteDiary: (state, payload) => {
      state.diarylist.splice(state.diarylist.findIndex(d => d.no == payload.no), 1);
    },
    addDiary: (state, payload) => {

      // diarylist에 sequence처럼 주기 위해.. 가장 큰 diary.no를 찾아오는 코드
      let maxNo = Math.max.apply(Math, state.diarylist.map(d => d.no))

      // dairylist에 추가할 객체 
      let diary = {
        no: maxNo + 1,
        title: payload.title,
        content: payload.content,
        writer: state.id,
        // DateUtil.getTodayDate() :: 오늘 날짜를 'yyyy년 MM월 dd일' string으로 리턴
        writeat: DateUtil.getTodayDate()
      }

      state.diarylist.push(diary);
    }
  },
  actions: {
    loginUser: (store, payload) => {
      store.commit('loginUser', payload);
    },
    logout: (store) => {
      if (confirm('로그아웃 하시겠어요?')) {
        store.commit('logout');
      }
    },
    setDirayOne: (store, payload) => {
      store.commit('setDirayOne', payload);
    },
    deleteDiary: (store, payload) => {
      if (confirm('정말로 삭제하시겠어요?')) {
        store.commit('deleteDiary', payload);
      }
    },
    addDiary: (store, payload) => {
      store.commit('addDiary', payload);
    }


  },
  getters: {

  }
})


export default store;
