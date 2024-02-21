<template>
  <section class="employee-details">
    <img loading="lazy" :src="employee.photo" class="employee-profile-photo" :alt="'Photo of ' + employee.name" />
    <div class="details">
      <h4 class="employee-name-full">{{ employee.name }}</h4>
      <p class="employee-contact">
        <span class="contact-label">email:</span>
        <span class="contact-email">{{ employee.email }}</span>
      </p>
      <p class="employee-contact">
        <span class="contact-label">phone:</span>
        <span class="contact-phone">{{ employee.phone }}</span>
      </p>
      <h4 class="about-title">About:</h4>
      <p class="employee-about">{{ employee.about }}</p>
    </div>
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
  flex-direction: column;
}

.details {
  margin-left: 20px;
}

.employee-profile-photo {
  width: 70px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #e31f24;
}

.employee-name-full {
  color: #333;
  font-weight: 600;
  font-family: Montserrat, sans-serif;
}

.contact-label {
  font-size: 14px;
  color: #333;
}

.contact-email, .contact-phone {
  font-weight: 400;
  font-size: 14px;
  color: #76787d;
}

.about-title {
  color: #333;
  font-weight: 600;
  font-size: 16px;
  margin-top: 16px;
}

.employee-about {
  margin-top: 8px;
  font: 400 14px Montserrat, sans-serif;
}
</style>