import axios from 'axios'

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
  }
}

const mutations = {
  upload_item (state) {
    state.status = 'loading'
  },
  upload_item_success (state) {
    state.status = 'success'
  }
}

export default {
  actions,
  mutations
}
