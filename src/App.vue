<template>
  <section class="container">
    <header class="header">
      <h1 class="title">Жилфонд</h1>
      <div class="user">Пользователь</div>
    </header>
    <section class="search-results">
      <Sidebar />
      <UserProfile v-if="selectedUser" />
    </section>
  </section>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import UserProfile from "./components/UserProfile.vue";

export default {
  components: {
    Sidebar,
    UserProfile,
  },
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser;
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 50px;
}

@media (max-width: 990px) {
  .container {
    padding: 20px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  
}

.title,
.user {
  color: #333;
  font: 400 16px/24px Montserrat, sans-serif;
}

.title {
  color: #e31f24;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2em;
}
.search-results {
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fdfdfd;
  margin-top: 26px;
  /* padding: 30px; */
}
</style>
