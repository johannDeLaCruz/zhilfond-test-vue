import { createStore } from "vuex";

export default createStore({
  state: {
    selectedUser: null,
  },
  mutations: {
    selectUser(state, user) {
      state.selectedUser = user;
    },
  },
});
