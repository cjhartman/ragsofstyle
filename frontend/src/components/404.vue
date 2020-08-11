<template>
  <div class="fouroh-page">
    <div>
      <h1>Nothing to see here.</h1>
      <p>Let's get you back to shopping.</p>
      <div class="secondary-button-container">
        <router-link class="secondary-button-btn" to="/home" tag="button">Click me to go home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.fouroh-page {
    min-height: 60vh;
    padding: 2rem 3rem;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;

  p {
    margin-bottom: 30px;
  }
}
</style>
