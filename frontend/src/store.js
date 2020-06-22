import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './warehouse/Auth'
import Items from './warehouse/Items'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Items
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
