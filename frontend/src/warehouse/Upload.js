import axios from 'axios'

const state = {
  items: {},
  status: ''
}

const getters = {
  uploadState: state => state.status,
  items: state => state.items,
  dbImages: state => {
    for (let db of state.items) {
      return db.selectedFlickrImage
    }
  }
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
    let res = await axios.get('https://localhost:3000/api/photos/items')
    commit('item_content', res.data.items)
    return res
  },

  // edit or put the original item
  async revise ({
    commit
  }, item) {
    commit('put_item')
    let res = await axios.put('https://localhost:3000/api/photos/upload', item)
    if (res.data.success !== undefined) {
      commit('put_item_success')
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
  },
  item_request (state) {
    state.status = 'loading'
  },
  item_content (state, items) {
    state.items = items
  },
  put_item (state) {
    state.status = 'loading'
  },
  put_item_success (state) {
    state.status = 'success'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
