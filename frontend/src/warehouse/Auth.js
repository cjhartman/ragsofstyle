import axios from 'axios'

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
    let res = await axios.post('http://localhost:3000/api/users/login', user)
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
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
