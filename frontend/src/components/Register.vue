<template>
  <div>
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <input
          type="name"
          name="name"
          v-model="name"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="Email"
        />
        <input
          type="name"
          name="username"
          v-model="username"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
        />
        <input
          type="password"
          name="confirm_password"
          v-model="confirm_password"
          placeholder="Confirm Password"
        />
        <button
          @click="register()">
            Register
        </button>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      email: '',
      username: '',
      password: '',
      confirm_password: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    registerUser () {
      let user = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password
      }
      this.register(user).then(res => {
        if (res.data.success) {
          this.$router.push('login')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
