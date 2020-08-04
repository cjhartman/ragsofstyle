<template>
  <main class="container">
    <form @submit.prevent="changePW" class="reset-pw-form">
      <input type="text" placeholder="Password" name="password" v-model="password" class="form" />
      <input
        type="text"
        placeholder="Confirm Password"
        name="confirm-password"
        v-model="confirmPW"
        class="form"
      />
      <div class="button-group">
        <div class="secondary-button-container">
          <button type="submit" class="secondary-button-btn">Reset Password</button>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      password: '',
      confirmPW: '',
      token: ''
    }
  },
  methods: {
    ...mapActions(['emailAcceptedForPWReset'])
  },
  created () {
    this.token = JSON.parse(JSON.stringify(this.$route.params.token))
    this.emailAcceptedForPWReset(this.token)
      .then((res) => {
        if (res) {
          console.log('great success' + res)
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          this.$router.push('/login')
        }
      })
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
</style>
