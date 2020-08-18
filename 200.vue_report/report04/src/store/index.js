import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    id: ""
  },
  mutations: {
    addId: (state, payload) => {
      // state 변경
      state.id = payload.id;
    }
  },
  actions: {
    addId: (store, payload) => {
      // validation check
      if (payload.id.length < 2) {
        alert("아이디는 2글자 이상으로 입력해주세요.");
        return;
      }
      if (confirm(`[${payload.id}]로 로그인하시겠습니까?`) == false) {
        alert("로그인 정보를 다시 입력해주세요.");
        return;
      }
      // mutation 호출
      store.commit("addId", payload);
    }
  }
});

export default store;
