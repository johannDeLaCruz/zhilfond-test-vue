<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Жилфонд</h1>
      <div class="user">Пользователь</div>
    </header>
    <main class="search-results">
      <Sidebar />
      <UserProfile />
    </main>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import UserProfile from "./components/UserProfile.vue";

export default {
  components: {
    Sidebar,
    UserProfile,
  },
};
</script>

<style scoped lang="scss">
@import "./style/style.scss";
.container {
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
  padding: 50px;
}

// @media (max-width: 990px) {
//   .container {
//     padding: 20px;
//   }
// }
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  color: $accent-color;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2em;
}
.search-results {
  display: flex;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: $bg-color;
  margin-top: 26px;
  min-height: 575px;
}
</style>
