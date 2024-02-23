import { createStore } from "vuex";

export default createStore({
  state: {
    selectedUser: null,
    users: [],
    error: null,
    searchQuery: "",
  },
  mutations: {
    selectUser(state, user) {
      state.selectedUser = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setError(state, error) {
      state.error = error;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    async fetchUsers({ commit, state }) {
      try {
        commit(
          "setError",
          state.searchQuery.trim() === ""
            ? "начните поиск"
            : "Идет загрузка данных..."
        );
        if (state.searchQuery.trim() === "") {
          commit("setUsers", []);
          commit("selectUser", null);
          return;
        }
        const query = state.searchQuery.includes(",")
          ? state.searchQuery.split(", ")
          : [state.searchQuery];
        const type = query.every((item) => !isNaN(item)) ? "id" : "username";
        const queryString = query.map((item) => `${type}=${item}`).join("&");
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?${queryString}`
        );
        if (!response.ok) {
          throw new Error("Что-то пошло не так!");
        }
        const data = await response.json();
        if (data.length === 0) {
          commit("setError", "ничего не найдено");
          commit("setUsers", []);
          return;
        }
        const users = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          photo: "../assets/avatar-placeholder-lg.png",
        }));
        commit("setUsers", users);
        commit("setError", null);
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },
});
