<template>
  <main class="container">
    <div class="reset-container">
      <h1>Let's reset your password.</h1>
      <p>First, give me your email you signed up with.</p>
      <form @submit.prevent="checkEmail">
        <input type="text" placeholder="Email" name="email" v-model="email" class="form" />
        <div class="button-group">
          <router-link class="reset-link" to="/login">Back</router-link>
          <div class="secondary-button-container">
            <button type="submit" class="secondary-button-btn">Send Email</button>
          </div>
        </div>
      </form>
      <p v-if="isActiveUser">Check the email you provided for a link to your password reset.</p>
      <p class="wrong-user" v-if="wrongUser">You have input an incorrect email. Please try again.</p>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: '',
      isActiveUser: false,
      wrongUser: false
    }
  },
  methods: {
    ...mapActions(['findUserForPWReset', 'resetState', 'resetPW']),
    checkEmail () {
      let email = {
        email: this.email
      }
      this.findUserForPWReset(email)
        .then((res) => {
          if (res.data.success) {
            this.wrongUser = false
            this.isActiveUser = true
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            this.wrongUser = true
            this.isActiveUser = false
          }
        })
    }
  },
  created () {
    // this.resetState()
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .reset-container {
    .button-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

      .secondary-button-container {
        width: 50%;
      }

      .reset-link {
        font-size: 0.9rem;
        color: #f26f63;
        text-decoration: none;
        cursor: pointer;
      }
    }

    .reset-pw-form {
      margin-top: 20px;
    }

    .wrong-user {
      font-weight: 700;
      color: #f26f63;
    }
  }
}
</style>
