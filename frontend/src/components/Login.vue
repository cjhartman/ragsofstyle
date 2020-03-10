<template>
    <div>
        <h1>Account Login</h1>
        <section class="login-container">
            <div class="login-form">
                <form>
                    <div class=form-group>
                        <label for="username" class="form-label">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            v-model="username"
                            class="form"
                        >
                        <label for="password" class="form-label">Input your password</label>
                        <input
                            type="text"
                            placeholder="Password"
                            name="password"
                            v-model="username"
                            class="form"
                        >
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {

    .form-group {
        display: inline-block;
        width: 20rem;
    }
    .form, .form-label {
        width: 100%;
        display: block;
        text-align: left;
    }
}

</style>
