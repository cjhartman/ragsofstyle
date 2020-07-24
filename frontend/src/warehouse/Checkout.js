import axios from 'axios'

const state = {
  cart: [],
  status: ''
}

const getters = {
  cartState: state => state.status,
  cart: state => state.cart
}

const actions = {
  // adds item to cart
  async addToCart ({
    commit
  }, cart) {
    commit('add_to_cart')
    let res = await axios.post('https://localhost:3000/api/cart/add', cart)
    if (res.data.success !== undefined) {
      commit('add_to_cart_success')
    }
    return res
  },

  async getCart ({
    commit
  }) {
    commit('cart_items_request')
    let res = await axios.get('https://localhost:3000/api/cart/items')
    commit('cart_items_content', res.data.cart)
    return res
  },

  async removeFromCart ({
    commit
  }, id) {
    commit('remove_from_cart')
    let res = await axios.delete('https://localhost:3000/api/cart/remove/' + id)
    if (res.data.success !== undefined) {
      commit('remove_from_cart_success')
    }
    return res
  }
}

const mutations = {
  add_to_cart (state) {
    state.status = 'loading'
  },
  add_to_cart_success (state) {
    state.status = 'success'
  },
  cart_items_request (state) {
    state.status = 'loading'
  },
  cart_items_content (state, cart) {
    state.cart = cart
  },
  remove_from_cart (state) {
    state.staus = 'loading'
  },
  remove_from_cart_success (state, id) {
    let index = state.cart.findIndex(item => item.id === id)
    state.cart.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
