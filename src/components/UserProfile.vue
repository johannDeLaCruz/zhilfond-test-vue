<template>
  <section v-if="employee" class="employee-details">
    <div>
      <img
        loading="lazy"
        src="../assets/avatar-placeholder-lg.png"
        class="employee-profile-photo"
        :alt="'Photo of ' + employee.name"
      />
    </div>
    <div class="details">
      <div class="employee-wrapper">
        <h4 class="employee-name-full">{{ employee.name }}</h4>
        <p class="employee-contact">
          <span class="contact-label">email:</span>
          <span class="contact-data">{{ employee.email }}</span>
        </p>
        <p class="employee-contact">
          <span class="contact-label">phone:</span>
          <span class="contact-data">{{ employee.phone }}</span>
        </p>
      </div>
      <div class="about-wrapper">
        <h4 class="about-title">О себе:</h4>
        <p class="employee-about">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  </section>
  <section v-else class="no-users">
    <span>Выберите сотрудника, чтобы посмотреть его профиль</span>
  </section>
</template>

<script>
export default {
  computed: {
    employee() {
      return this.$store.state.selectedUser;
    },
  },
};
</script>
<style scoped>
.employee-details {
  display: flex;
  padding: 30px 30px 21px 30px;
}

.details {
  margin-left: 61px;
}
.employee-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.employee-name-full {
  color: #000;
  font-weight: 600;
  line-height: 1.4em;
}
.contact-label {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  line-height: 1.4em;
  margin-right: 14px;
}

.contact-data {
  font-weight: 400;
  font-size: 14px;
  color: #76787d;
}
.about-wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
}
.about-title {
  color: #333;
  font-weight: 600;
  margin-top: 16px;
}
.employee-about {
  font-size: 14px;
  font-weight: 400;
  color: #76787d;
}
.no-users {
  font-size: 14px;
  line-height: 1.2em;
  color: #76787d;
  margin: auto;
}
</style>
