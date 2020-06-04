import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './warehouse/Auth'
import Upload from './warehouse/Upload'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Upload
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
