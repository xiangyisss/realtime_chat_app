import { createStore } from 'vuex';

export default createStore({
  state: {
    chatroom: {
      roomName: '',
    },
  },
  mutations: {
    passname(state, payload) {
      state.chatroom.roomName = payload;
    },
  },
  actions: {
    passname({ commit }, payload) {
      commit('passname', {
        payload,
      });
    },
  },
  modules: {
  },
});
