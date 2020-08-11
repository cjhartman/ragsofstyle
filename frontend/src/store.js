import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

import Auth from './warehouse/Auth'
import Items from './warehouse/Items'
import Checkout from './warehouse/Checkout'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Items,
    Checkout
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [persistedState()]
})
