const getDefaultCartState = () => {
  return {
    cart: [],
    cartStatus: 'empty'
  }
}

const state = () => ({
  cart: [],
  cartStatus: ''
})

const getters = {
  cartState: state => state.status,
  cart: state => state.cart
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

  getCart ({
    state,
    commit
  }) {
    if (state.cart.length > 0) {
      commit('get_cart_products', state.cart)
    }
  }

  // async removeFromCart ({
  //   commit
  // }, id) {
  //   commit('remove_from_cart_success')
  // }
}

const mutations = {
  add_to_cart (state, product) {
    state.cart.push(product)
  },
  get_cart_products (state, cart) {
    state.cart = cart
  },
  // remove_from_cart (state, id) {
  //   let index = state.cart.findIndex(item => item.id === id)
  //   state.cart.splice(index, 1)
  // }
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
