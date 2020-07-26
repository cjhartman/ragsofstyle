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
    state.cart.push(cart)
    commit('add_to_cart_success', state.cart)
    if (cart !== null || undefined) {
      return true
    } return false
  },

  async getCart ({
    commit
  }) {
    commit('cart_items_request')
    commit('cart_items_content')
  },

  async removeFromCart ({
    commit
  }, id) {
    commit('remove_from_cart')
    commit('remove_from_cart_success')
  }
}

const mutations = {
  add_to_cart (state) {
    state.status = 'loading'
  },
  add_to_cart_success (state, cart) {
    state.cart = cart
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
