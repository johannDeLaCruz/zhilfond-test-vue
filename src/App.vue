<template>
  <div class="container">
    <Sidebar />
    <UserProfile v-if="selectedUser" />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import UserProfile from './components/UserProfile.vue';

export default {
  components: {
    Sidebar,
    UserProfile
  },
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser;
    }
  }
};
</script>