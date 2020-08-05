import axios from 'axios'

const getDefaultCartState = () => {
  return {
    cart: [],
    cartLength: 0,
    cartStatus: 'empty',
    cartPrice: 0,
    paypalCheckoutItem: []
  }
}

const state = () => ({
  cart: [],
  cartLength: 0,
  cartStatus: '',
  cartPrice: 0,
  paypalCheckoutItem: []
})

const getters = {
  cartState: state => state.status,
  cart: state => state.cart,
  cartLength: state => state.cartLength,
  cartPrice: state => state.cartPrice,
  paypalCheckoutItem: state => state.paypalCheckoutItem
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
    state,
    commit
  }, product) {
    for (let cart of state.cart) {
      if (cart._id === product._id) {
        return true
      }
    }
    commit('add_to_cart', product)
    return product._id
  },

  // get the items in the cart
  getPayPalCart ({
    commit
  }, cartItem) {
    commit('create_paypal_checkout_item', cartItem)
  },

  // removes the items from the cart based on id
  // then refreshes header component
  async removeFromCart ({
    commit
  }, id) {
    commit('remove_from_cart', id)
    return true
  },

  async sdDeezNuts ({
    state
  }) {
    let res = await axios.put('https://localhost:3000/api/photos/sdItems', state.cart)
    if (res.status.success) {
      console.log('poop')
    }
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
    state.cartPrice += parseInt(product.price)
  },
  remove_from_cart (state, id) {
    state.cart.find(item => {
      if (item._id === id) {
        state.cartPrice = state.cartPrice - item.price
      }
    })
    let index = state.cart.findIndex(item => item._id === id)
    state.cart.splice(index, 1)
    state.cartLength--
  },
  create_paypal_checkout_item (state, checkoutItem) {
    state.paypalCheckoutItem = (checkoutItem)
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
