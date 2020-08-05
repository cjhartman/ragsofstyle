<template>
  <main class="container">
    <div class="reset-pw-form">
      <form @submit.prevent="changeUserPW" >
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
      <p class="error-msg" v-if="errorMsg">You encountered and issue. Maybe your password is incorrect.</p>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      password: '',
      confirmPW: '',
      token: '',
      errorMsg: false
    }
  },
  methods: {
    ...mapActions(['emailAcceptedForPWReset', 'changePassword']),
    changeUserPW () {
      let userNewPw = {
        password: this.password,
        confirmPw: this.confirmPW,
        token: JSON.parse(JSON.stringify(this.$route.params.token))
      }
      this.changePassword(userNewPw)
        .then((res) => {
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            this.errorMsg = true
          }
        })
    }
  },
  created () {
    this.token = JSON.parse(JSON.stringify(this.$route.params.token))
    this.emailAcceptedForPWReset(this.token)
      .then((res) => {
        if (res) {
          console.log('great success')
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

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  .reset-pw-form {
    display: block;
  }
}
</style>
