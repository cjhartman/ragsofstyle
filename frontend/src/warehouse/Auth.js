import axios from 'axios'
import router from '../router'

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
  logout (state) {
    state.status = ''
    state.token = ''
    state.user = ''
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
