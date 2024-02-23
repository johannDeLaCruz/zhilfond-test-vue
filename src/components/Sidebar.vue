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
        <li
          v-for="user in users"
          :key="user.id"
          @click="selectUser(user)"
          :class="{ selected: user.id === selectedUser?.id }"
        >
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["selectedUser"]),
  },
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
        this.error =
          this.searchQuery.trim() === ""
            ? "Start searching"
            : "Fetching data, please wait...";
        if (this.searchQuery.trim() === "") {
          this.$store.commit("selectUser", null);
          this.users = [];
          return;
        }
        const query = this.buildQuery();
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?${query}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        if (data.length === 0) {
          this.error = "Nothing found";
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
    buildQuery() {
      const searchQueryArray = this.searchQuery.includes(",")
        ? this.searchQuery.split(", ")
        : [this.searchQuery];
      const type = searchQueryArray.every((item) => !isNaN(item))
        ? "id"
        : "username";

      return searchQueryArray.map((item) => `${type}=${item}`).join("&");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../style/style.scss";
.employee-search {
  padding: 27px 31px;
  border-right: 1px solid #dededd;
  display: flex;
  flex-direction: column;
  row-gap: 29px;

  .row-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 14px;

    .search-title,
    .results-title {
      color: $text-header-color;
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
      color: $text-body-color;
      outline: none;
      transition: 0.3s;
      &:focus {
        border: 2px solid $accent-color;
      }
    }
    li {
      list-style-type: none;
      cursor: pointer;
      margin-bottom: 15px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      &.selected {
        background-color: #e0e0e0;
      }
      .employee {
        display: flex;
        align-items: center;
        column-gap: 15px;
        &-info {
          font-size: 14px;
          line-height: 1.2em;
        }
        &-name {
          color: $text-header-color;
        }
        &-photo {
          background-color: $bg-color;
        }
      }

      .error {
        line-height: 1.2em;
      }
    }
  }
}
</style>
