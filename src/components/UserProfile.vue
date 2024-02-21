<template>
  <div class="user-profile">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <p>{{ user.phone }}</p>
    <p>{{ user.website }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.selectedUser;
    },
  },
};
</script>

<style scoped lang="scss">
.user-profile {
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  p {
    margin: 5px 0;
  }
}
</style>
