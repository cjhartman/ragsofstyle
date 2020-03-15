<template>
  <div>
      <h1>Register</h1>
      <form>
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="Email"
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
          v-model="password"
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
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      confirm_password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  },
  mounted () {
    setTimeout(function () {
      this.email = 'hello world'
    }, 1000)
  }
}
</script>

<style scoped>

</style>
