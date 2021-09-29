import { createStore } from 'vuex';

export default createStore({
  state: {
    chatroom: {
      roomName: '',
    },
  },
  mutations: {
    gotName(state, payload) {
      state.chatroom.roomName = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
