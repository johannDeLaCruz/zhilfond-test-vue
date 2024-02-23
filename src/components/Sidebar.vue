<template>
  <side class="employee-search">
    <div class="row-wrapper">
      <label for="search" class="search-title">Поиск сотрудников</label>
      <input
        id="search"
        type="text"
        v-model="searchQuery"
        @input="fetchUsers"
        placeholder="Введите Id или имя "
      />
    </div>
    <div class="row-wrapper">
      <h2 class="results-title">Результаты</h2>
      <p v-if="searchQuery.length === 0" class="error">начните поиск</p>
      <p v-else-if="error" class="error">{{ error }}</p>
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id" @click="selectUser(user)">
          <article class="employee">
            <img
              loading="lazy"
              src="../assets/avatar-placeholder.png"
              class="employee-photo"
              alt="Employee photo"
            />
            <div class="employee-info">
              <h4 class="employee-name">{{ user.name }}</h4>
              <p class="employee-email">{{ user.email }}</p>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </side>
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
      function buildQuery(searchQuery, type) {
        if (type === "id") {
          return searchQuery.map((item) => `id=${item}`).join("&");
        } else if (type === "username") {
          return searchQuery.map((item) => `username=${item}`).join("&");
        } else {
          throw new Error("Введен не тот тип данных!");
        }
      }
      let query = "";
      const searchQueryArray = this.searchQuery.includes(",")
        ? this.searchQuery.split(", ")
        : [this.searchQuery];

      if (searchQueryArray.every((item) => !isNaN(item))) {
        query = buildQuery(searchQueryArray, "id");
      } else {
        query = buildQuery(searchQueryArray, "username");
      }
      try {
        this.error = "Просходит запрос, подождите...";
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?${query}`
        );
        if (!response.ok) {
          throw new Error("Что-то пошло не так!");
        }
        const data = await response.json();
        if (data.length === 0) {
          this.error = "ничего не найдено";
          this.users = [];
          return;
        }
        this.users = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          photo: "../assets/avatar-placeholder-lg.png",
        }));
        this.error = null;
      } catch (error) {
        this.error = error;
      }
    },
    selectUser(user) {
      this.$store.commit("selectUser", user);
    },
  },
};
</script>

<style scoped lang="scss">
.employee-search {
  padding: 27px 31px 27px 20px;
  border-right: 1px solid #dededd;
  display: flex;
  flex-direction: column;
  row-gap: 29px;
}
.row-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
}
.search-title,
.results-title {
  color: #333;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.4em;
}
#search {
  padding: 14px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  width: 240px;
  font-size: 14px;
  line-height: 1.2em;
  color: #76787d;
  outline: none;
  transition: 0.3s;
}
#search:focus {
  border: 2px solid #e31f24;
}

li {
  list-style-type: none;
  cursor: pointer;
  margin-bottom: 15px;
}
.employee {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  column-gap: 15px;
}
.employee-info {
  font-size: 14px;
  line-height: 1.2em;
}
.employee-email {
  color: #76787d;
}
.error {
  font-size: 14px;
  line-height: 1.2em;
  color: #76787d;
}
</style>
