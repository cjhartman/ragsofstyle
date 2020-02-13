<template>
    <div>
        <h1>Register</h1>

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
        <button
          @click="register()">
            Register
        </button>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
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
