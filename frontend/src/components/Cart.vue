<template>
  <section class="cart-container">
    <div v-if="!itemsInCart">
      <h1>You dont have any items in your cart... yet.</h1>
      <p>Let's get you back to shopping.</p>
      <div class="secondary-button-container">
        <router-link class="secondary-button-btn" to="/home" tag="button">Click me to go home</router-link>
      </div>
    </div>
    <div v-if="itemsInCart">
      <h1>Your Cart</h1>
      <h2></h2>
    </div>
  </section>
</template>

<script>
import Checkout from '../warehouse/Checkout'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      itemsInCart: []
    }
  },
  computed: {
    ...mapGetters(['cart'])
  },
  methods: {
    ...mapActions([
      'getCart'
    ]),
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  min-height: 60vh;
  padding: 2rem 3rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  p {
    margin-bottom: 30px;
  }
}
</style>
