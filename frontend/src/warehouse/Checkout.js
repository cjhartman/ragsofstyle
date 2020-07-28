const getDefaultCartState = () => {
  return {
    cart: [],
    cartLength: 0,
    cartStatus: 'empty'
  }
}

const state = () => ({
  cart: [],
  cartLength: 0,
  cartStatus: ''
})

const getters = {
  cartState: state => state.status,
  cart: state => state.cart,
  cartLength: state => state.cartLength
}

const actions = {
  // resets state
  resetCartState ({
    commit
  }) {
    commit('reset_state')
  },

  // adds item to cart
  addToCart ({
    commit
  }, product) {
    commit('add_to_cart', product)
    return product._id
  },

  // get the items in the cart
  getCart ({
    state,
    commit
  }) {
    if (state.cart.length > 0) {
      commit('get_cart_products', state.cart)
    }
  },

  // removes the items from the cart based on id
  // then refreshes header component
  async removeFromCart ({
    commit
  }, id) {
    commit('remove_from_cart', id)
    commit('remove_from_cart_success')
  },

  resetState ({
    commit
  }) {
    commit('reset_state')
  }
}

const mutations = {
  add_to_cart (state, product) {
    state.cart.push(product)
    state.cartLength++
  },
  get_cart_products (state, cart) {
    state.cart = cart
  },
  remove_from_cart (state, id) {
    let index = state.cart.findIndex(item => item.id === id)
    state.cart.splice(index, 1)
    state.cartLength--
  },
  remove_from_cart_success (state) {

  },
  reset_state (state) {
    Object.assign(state, getDefaultCartState())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
