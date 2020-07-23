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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
