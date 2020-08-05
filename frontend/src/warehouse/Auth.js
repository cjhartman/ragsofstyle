import axios from 'axios'
import router from '../router'

const getDefaultAuthState = () => {
  return {
    token: localStorage.getItem('token') || '',
    user: {},
    status: ''
  }
}

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: ''
}

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user
}

const actions = {
  async login ({
    commit
  }, user) {
    commit('auth_request')
    let res = await axios.post('https://localhost:3000/api/users/login', user)
    console.log(res)
    if (res.data.success) {
      const token = res.data.token
      const user = res.data.user
      // Store the token into localStorage
      localStorage.setItem('token', token)
      // Set the axious defaults
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', token, user)
    }
    return res
  },

  // register a user
  async register ({
    commit
  }, userData) {
    commit('register_request')
    let res = await axios.post('https://localhost:3000/api/users/register', userData)
    if (res.data.success !== undefined) {
      commit('register_success')
    }
    return res
  },

  // Get the admin profile
  async getAdminProfile ({
    commit
  }) {
    commit('admin_request')
    let res = await axios.get('https://localhost:3000/api/users/profile')
    commit('admin_profile', res.data.user)
    return res
  },

  // logout the user
  async logout ({
    commit
  }) {
    await localStorage.removeItem('token')
    commit('logout')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  },

  // find user in order to reset pw
  async findUserForPWReset ({
    commit
  }, email) {
    commit('email_request')
    let res = await axios.post('https://localhost:3000/api/users/forgot-password', email)
    if (res.status === 200) {
      return res
    }
  },

  async emailAcceptedForPWReset ({
    commit
  }, token) {
    commit('reset_request')
    let res = await axios.get('https://localhost:3000/api/users/reset/' + token)
    if (res.status.success) {
      return res
    }
  },

  async changePassword ({
    commit
  }, newPw) {
    commit('newpw_request')
    let res = await axios.post('https://localhost:3000/api/users/reset/' + newPw.token, newPw)
    if (res.data.success) {
      router.push('/login')
    }
  },

  // reset state
  resetState ({
    commit
  }) {
    commit('reset_state')
  }
}

const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, token, user) {
    state.token = token
    state.user = user
    state.status = 'success'
  },
  register_request (state) {
    state.status = 'loading'
  },
  register_success (state) {
    state.status = 'success'
  },
  admin_request (state) {
    state.status = 'loading'
  },
  admin_profile (state, user) {
    state.user = user
  },
  email_request (state) {
    state.status = 'loading'
  },
  logout (state) {
    state.status = ''
    state.token = ''
    state.user = ''
  },
  reset_request (state) {
    state.status = 'loading'
  },
  newpw_request (state) {
    state.status = 'loading'
  },
  reset_state (state) {
    Object.assign(state, getDefaultAuthState())
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
