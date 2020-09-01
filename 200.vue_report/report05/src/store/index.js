import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // list component에서 timeline 형식 or card 형식 flag
    listmode: 'timeline',

    // diaryForm component에서 wrtie 형식 or update 형식 flag
    formmode: 'write',

    // 로그인 여부를 확인할 property
    id: '',

    // detail / update 화면에서 일치하는 하나의 diary만 넣어줄 property
    diary: {
      no: 0,
      title: '',
      weather: '',
      emotion: '',
      content: '',
      writer: '',
      writeat: ''
    },

    //작성된 diary의 list_ dummy data
    diarylist: [{
        no: 1,
        writer: 'jee',
        title: '05일기장 제목 01',
        weather: 'rain',
        emotion: 'angry',
        content: 'a\n난 오늘 \n\n\n\n\n너무 더웠다..',
        writeat: 'Thu Aug 01 2020 17:35:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 2,
        writer: 'min',
        title: 'diary title 02',
        weather: 'sunny',
        emotion: 'angry',
        content: 'the rainy days is over... \n\n\n\n\nbut im so hot..\n\n 지겨운 장마가 끝나버렸다...그토록 싫었던 비가 그립다..',
        writeat: 'Thu Aug 02 2020 15:20:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 3,
        writer: 'jee',
        title: '01일기장 제목 03',
        weather: 'cloudy',
        emotion: 'sad',
        content: 'ㅎ vue를 배웠다.. \n\n\n재미가 있었다.',
        writeat: 'Thu Aug 05 2020 08:15:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 4,
        writer: 'jee',
        title: 'diary title 01',
        weather: 'snow',
        emotion: 'sad',
        content: '너무 더워서....\n\n\n\n 나는 더위사냥을 사먹어버렸다.',
        writeat: 'Thu Aug 08 2020 19:35:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 5,
        writer: 'haeng',
        title: '일기장 제목 04',
        weather: 'rain',
        emotion: 'happy',
        content: '집에서 영화를 \n\n\n\n\n\n보았다.',
        writeat: 'Thu Aug 08 2020 10:48:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 6,
        writer: 'haeng',
        title: '일기를 쓰려다가..',
        weather: 'sunny',
        emotion: 'happy',
        content: '무심코\n\n\n 그대에게..\n\n\n 편지를 썼다..',
        writeat: 'Thu Aug 10 2020 15:07:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 7,
        writer: 'min',
        title: '일기-1를 쓰려다가..',
        weather: 'rain',
        emotion: 'sad',
        content: '무심코 \n\n\n반성문을\n\n\n 썼다..',
        writeat: 'Thu Aug 11 2020 17:05:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 8,
        writer: 'jee',
        title: '04일기장 제목 행복',
        weather: 'cloudy',
        emotion: 'happy',
        content: '마음을 열어\n\n\n\n\n\n 하늘을 보라 ',
        writeat: 'Thu Aug 11 2020 08:35:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 9,
        writer: 'jee',
        title: '행복이란 무엇일까',
        weather: 'sunny',
        emotion: 'sad',
        content: '난\n행\n복\n해\n.\n.\n.\n\n\n^^',
        writeat: 'Thu Aug 14 2020 15:27:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 10,
        writer: 'jee',
        title: '행복과 사랑이란 무엇일까',
        weather: 'sunny',
        emotion: 'happy',
        content: '88\n\n\n\n\n\n\n\n\n\n\n\n내용\n입니다\n.',
        writeat: 'Thu Aug 15 2020 17:32:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 11,
        writer: 'jee',
        title: '일기장 제목 0401 무엇일까',
        weather: 'snow',
        emotion: 'happy',
        content: '66\n\n\n내용\n\n\n\n\n\n\n\n\n내용\n입니다\n.',
        writeat: 'Thu Aug 16 2020 16:35:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 12,
        writer: 'jee',
        title: '일기장 제목 0501',
        weather: 'sunny',
        emotion: 'happy',
        content: '111\n내\n용\n이\n에\n요\n.\n.\n.\n\n\n\n내용\n입니다\n.',
        writeat: 'Thu Aug 17 2020 03:15:57 GMT+0900 (대한민국 표준시)'
      },
      {
        no: 13,
        writer: 'jee',
        weather: 'cloudy',
        emotion: 'sad',
        title: 'vue vue vue01 vue view vueviewvuew 행복',
        content: '01\n.\n.\n.\n.\n.\n.\n.\n.\n.\n\n\n내용\n입니다\n.',
        writeat: 'Thu Aug 19 2020 14:05:57 GMT+0900 (대한민국 표준시)'
      },
    ]
  },

  mutations: {
    // state.listmode 관련-------------------------------
    changeListMode: (state, payload) => {
      state.listmode = payload.listmode;
    },

    // state.formmode 관련-------------------------------
    changeFormMode: (state, payload) => {
      state.formmode = payload.formmode;
    },

    // state.id 관련-------------------------------
    loginUser: (state, payload) => {
      state.id = payload.id;
    },
    logout: (state) => {
      state.id = '';
    },

    // state.diary 관련-------------------------------
    // diary.no 로 하나의 diary 를 찾아 state에 넣어두는 mutation
    setDiaryOne: (state, payload) => {
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
        weather: payload.weather,
        emotion: payload.emotion,
        content: payload.content,
        writer: state.id,
        writeat: new Date()
      }

      state.diarylist.push(diary);
    },

    updateDiary: (state, payload) => {
      let index = state.diarylist.findIndex(d => d.no == state.diary.no);
      state.diarylist[index].title = payload.title;
      state.diarylist[index].weather = payload.weather;
      state.diarylist[index].emotion = payload.emotion;
      state.diarylist[index].content = payload.content;
    }
  },

  actions: {
    // state.listmode 관련-------------------------------
    changeListMode: (store, payload) => {
      store.commit('changeListMode', payload);
    },

    // state.formmode 관련-------------------------------
    changeFormMode: (store, payload) => {
      if (payload.formmode == 'update') {
        store.commit('setDiaryOne', payload)
        store.commit('changeFormMode', payload);
      } else {
        store.commit('changeFormMode', payload);
      }
    },

    // state.id 관련-------------------------------
    loginUser: (store, payload) => {
      store.commit('loginUser', payload);
    },

    logout: (store) => {
      store.commit('logout');
      // state.diary 관련-------------------------------
    },

    setDirayOne: (store, payload) => {
      store.commit('setDiaryOne', payload);
    },

    deleteDiary: (store, payload) => {
      store.commit('deleteDiary', payload);
    },

    addDiary: (store, payload) => {
      store.commit('addDiary', payload);
    },

    updateDiary: (store, payload) => {
      store.commit('updateDiary', payload);
    }


  },
})


export default store;
