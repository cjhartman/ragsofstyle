<template>
    <div class="container">
        <section class="login-container">
            <div class="login-header">
                <h1 class="main-headers">Welcome Back</h1>
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
                        <div class="button-group">
                            <a href="#" class="reset-link">Reset Password</a>
                            <div class="secondary-button-container">
                                <button type="submit" class="seconday-button">Login</button>
                            </div>
                        </div>
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

    .login-container {
        .login-header {
            margin-bottom: 35px;

            .main-headers {
                position: relative;

                &:after {
                    content: "Welcome Back";
                    position: absolute;
                    top: 2px;
                    left: -2px;
                    color: #fec23b;
                    z-index: -1;
                }
            }
        }

        .form-group {
            display: inline-block;
            width: 20rem;

            .username-form {
                margin-bottom: 10px;
            }
        }
        .button-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;

            .secondary-button-container {
                width: 50%;
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
