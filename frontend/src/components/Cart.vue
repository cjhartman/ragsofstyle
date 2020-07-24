<template>
  <main class="cart-container">
    <div v-if="!itemsInCart">
      <h1>You dont have any items in your cart... yet.</h1>
      <p>Let's get you back to shopping.</p>
      <div class="secondary-button-container">
        <router-link class="secondary-button-btn" to="/home" tag="button">Click me to go home</router-link>
      </div>
    </div>
    <section class="cart" v-if="itemsInCart">
      <div class="cart-content">
        <h1 class="cart-header">Your Cart</h1>
        <div v-for="cart in cart" :key="cart._id" class="cart-item">
          <div class="cart-item-container">
            <img class="cart-item-container-img" :src="'https://farm' + cart.farmId + '.staticflickr.com/' + cart.serverId + '/' + cart.selectedFlickrImage[0] + '_' + cart.secret[0] + '.jpg'"/>
            <div>
              <h2 class="cart-item-container-title">{{ cart.title }}</h2>
              <p>
                <span class="cart-item-container-color">Main color:</span>
                <span class="cart-item-container-color-content">{{ cart.color }}</span>
              </p>
              <p>
                <span class="cart-item-container-size">Size:</span>
                <span class="cart-item-container-size-content">{{ cart.size }}</span>
              </p>
              <button>Remove from cart</button>
            </div>
          </div>
          <p class="cart-item-container-price">${{ cart.price }}</p>
        </div>
      </div>
      <div class="cart-total">
        <p>
          <span>SUB-TOTAL</span>
          <span>${{ totalCartPrice }}</span>
        </p>
        <p>
          <span>
            Delivery (Always Free)
          </span>
          <span>$0</span>
        </p>
        <p>
          <span>TOTAL</span>
          <span>${{ totalCartPrice }}</span>
        </p>
        <div class="secondary-button-container">
          <button class="secondary-button-btn" @click="checkout()">Checkout with PayPal</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      itemsInCart: [],
      cartImg: '',
      totalCartPrice: 0
    }
  },
  computed: {
    ...mapGetters(['cart'])
  },
  methods: {
    ...mapActions([
      'getCart'
    ]),
    getTotalPrice () {
      for (let price of this.cart) {
        this.totalCartPrice += price.price++
      }
    },
    checkout () {
      console.log('poop')
    }
  },
  created () {
    this.getCart()
  },
  beforeMount () {
    this.getTotalPrice()
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  min-height: 60vh;
  padding: 1rem 8rem;
  display: flex;

  .cart {
    width: 100%;

    .cart-content {
      border-bottom: 2px solid #cccccc;

      .cart-header {
        border-bottom: 2px solid #cccccc;
        font-size: 3rem;
      }

      .cart-item {
        display: flex;
        justify-content: space-between;

        &-container {
          margin-bottom: 2rem;
          display: flex;

          p {
            margin: 0;
          }

          &-img {
            max-width: 250px;
            margin-right: 2rem;
          }

          &-title {
            margin-top: 0;
          }

          &-color, &-size {
            font-family: 'Shrikhand', cursive;
            font-size: 1.25rem;
          }

          &-price {
            font-size: 1.5em;
            margin-top: 3px;
          }
        }
      }
    }

    .cart-total {
      text-align: right;
      font-size: 1.5rem;
      margin-bottom: 100px;

      .secondary-button-container {
        max-width: 300px;
      }
    }
  }
}
</style>
