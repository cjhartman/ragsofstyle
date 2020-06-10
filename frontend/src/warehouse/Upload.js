import axios from 'axios'

const state = {
  item: {},
  status: ''
}

const getters = {
  uploadState: state => state.status,
  item: state => state.user
}

const actions = {
  // upload a new item to db
  async upload ({
    commit
  }, item) {
    commit('upload_item')
    let res = await axios.post('https://localhost:3000/api/photos/upload', item)
    if (res.data.success !== undefined) {
      commit('upload_item_success')
    }
    return res
  },

  // Get the image content
  async getItem ({
    commit
  }) {
    commit('item_request')
    let res = await axios.get('https://localhost:3000/api/users/upload')
    commit('item_content', res.data.item)
    return res
  }
}

const mutations = {
  upload_item (state) {
    state.status = 'loading'
  },
  upload_item_success (state) {
    state.status = 'success'
  },
  item_request (state) {
    state.status = 'loading'
  },
  item_content (state, item) {
    state.item = item
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
