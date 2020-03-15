<template>
    <div class="container">
        <section class="login-container">
            <div class="login-header">
                <h1>Welcome Back</h1>
                <h4>Please login with your username & password</h4>
            </div>
            <div class="login-form">
                <form @submit.prevent="loginUser">
                    <div class=form-group>
                        <div class="username-form">
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                v-model="username"
                                class="form"
                            >
                        </div>
                        <div class="password-form">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                v-model="password"
                                class="form"
                            >
                        </div>
                    </div>
                    <div class="button-group">
                        <a href="#" class="reset-link">Reset Password</a>
                        <button type="submit" class="login-button">Login</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    loginUser () {
      let user = {
        username: this.username,
        password: this.password
      }
      this.login(user).then(res => {
        if (res.data.success) {
          this.$router.push('/admin')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fec23b;

    .login-container {
        .login-header {
            margin-bottom: 35px;
        }

        .form-group {
            display: inline-block;
            width: 20rem;

            .username-form {
                margin-bottom: 10px;
            }

            .form {
                width: 100%;
                display: block;
                text-align: left;
                border-radius: 5px;
                border: 1px solid gray;
                padding: 10px;
                outline: none;
                font-size: 1em;
                background-color: transparent;
                color: #f26f63;

                &:focus {
                    box-shadow: 0 0 5px #f26f63;
                    padding: 10px;
                    border: 1px solid #f26f63;
                }
            }
        }
        .button-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;

            .login-button {
                border-radius: 5px;
                border: 1px solid gray;
                background-color: transparent;
                outline: none;
                cursor: pointer;
                padding: 7px;
            }

            .reset-link {
                font-size: .9rem;
                color: #f26f63;
                text-decoration: none;
                cursor: pointer;
            }
        }
    }
}
</style>
