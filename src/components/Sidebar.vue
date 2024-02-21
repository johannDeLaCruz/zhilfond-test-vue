<template>
  <div class="sidebar">
    <input
      type="text"
      v-model="searchQuery"
      @input="fetchUsers"
      placeholder="Search by name"
    />
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id" @click="selectUser(user)">
        {{ user.name }}
      </li>
    </ul>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      users: [],
      error: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$axios.get(
          "https://jsonplaceholder.typicode.com/users",
          {
            params: {
              username_like: this.searchQuery,
            },
          }
        );
        this.users = response.data;
        this.error = null;
      } catch (error) {
        this.error = "Error fetching users";
      }
    },
    selectUser(user) {
      this.$store.commit("selectUser", user);
    },
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    li {
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
  .error {
    color: red;
  }
}
</style>
