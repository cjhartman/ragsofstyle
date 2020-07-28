<template>
  <main class="cart-container">
    <div class="no-items-in-cart" v-if="!cart.length">
      <h1>You dont have any items in your cart... yet.</h1>
      <p>Let's get you back to shopping.</p>
      <div class="secondary-button-container">
        <router-link class="secondary-button-btn" to="/home" tag="button">Click me to go home</router-link>
      </div>
    </div>
    <section class="cart" v-if="cart.length">
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
              <button class="remove-from-cart" @click="removeItemFromCart(cart._id)">Remove from cart</button>
            </div>
          </div>
          <p class="cart-item-container-price">${{ cart.price }}</p>
        </div>
      </div>
      <div class="cart-total">
        <p class="paypal-message">{{ paypalMessage }}</p>
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
        <PayPal
          :amount="paypalCartPrice"
          currency="USD"
          :client="paypal"
          :button-style="myStyle"
          env="sandbox"
          @payment-completed="payment_completed_cb"
          @payment-cancelled="payment_cancelled_cb">
        </PayPal>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PayPal from 'vue-paypal-checkout'
export default {
  data () {
    return {
      itemsInCart: [],
      cartImg: '',
      totalCartPrice: 0,
      paypalCartPrice: '',
      paypalMessage: '',
      paypal: {
        sandbox: 'ASg_2GUBjGIyaMFQ1xIWhyhEvfJhYBqdluq5odsldEChwiPRWn8dTU2S34JCVNJZ3rTaz2s_6_1arcrb',
        production: '<production client id>'
      },
      myStyle: {
        shape: 'rect',
        color: 'gold'
      },
      payment_completed: {
        payment_completed_cb () {
        }
      },
      payment_cancelled: {
        payment_cancelled_cb () {
        }
      }
    }
  },
  components: {
    PayPal
  },
  computed: {
    ...mapGetters(['cart'])
  },
  methods: {
    ...mapActions([
      'removeFromCart'
    ]),
    getTotalPrice () {
      for (let price of this.cart) {
        this.totalCartPrice += parseInt(price.price)
      }
      this.paypalCartPrice = this.totalCartPrice.toString()
    },
    checkout () {
      console.log('poop')
    },
    removeItemFromCart (id) {
      this.removeFromCart(id).then((res) => {
        if (res.status === 204) {
          this.$router.go()
        }
      })
    },
    payment_completed_cb (res, planName) {
      this.paypalMessage = '* Thank you for your payment! We will send you an invoice to your email soon.'
      setTimeout(() => {
        this.paypalMessage = ''
      }, 3000)
    },
    payment_cancelled_cb (res) {
      this.paypalMessage = '* Your payment has been cancelled. Your card is not charged.'
      setTimeout(() => {
        this.paypalMessage = ''
      }, 4000)
    }
  },
  created () {
    this.getTotalPrice()
  }
}
</script>

<style lang="scss" scoped>

.cart-container {
  padding: 3rem 3rem;
  display: flex;
  height: 100%;
  min-height: 60vh;

  .no-items-in-cart {
    align-self: center;
    justify-self: center;
    text-align: center;
    width: 100%;
  }

  .cart {
    width: 100%;

    .cart-content {
      border-bottom: 2px solid #cccccc;

      .cart-header {
        border-bottom: 2px solid #cccccc;
        font-size: 3rem;
      }

      .cart-item {

        &-container {
          margin-bottom: 2rem;

          .remove-from-cart {
            border: none;
            text-decoration: none;
            background-color: transparent;
            font-weight: 600;
            font-size: 1rem;
            padding: 2px;
            margin-top: 1rem;
            position: relative;
            z-index: 10;

            &:focus {
              outline: none;

              &:after {
                background-color: rgba(#fec23b, 0.9);
              }
            }

            &:after {
              content: '';
              height: 10px;
              width: 100%;
              background-color: rgba(#fec23b, 0.6);
              position: absolute;
              bottom: -1px;
              left: 0;
              z-index: -1;
            }
          }

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

      .paypal-message {
        color: #fec23b;
      }

      .secondary-button-container {
        max-width: 300px;
      }
    }
  }
}

@media (min-width: 768px) {
  .cart-container {
    padding: 1rem 8rem;

    .no-items-in-cart {
      align-self: center;
      justify-self: center;
      text-align: center;
      width: 100%;

      h1 {
        width: 100%;
      }

      .secondary-button-container {
        max-width: 500px;
      }
    }

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

            .remove-from-cart {
              border: none;
              text-decoration: none;
              background-color: transparent;
              font-weight: 600;
              font-size: 1rem;
              padding: 2px;
              margin-top: 1rem;
              position: relative;
              z-index: 10;

              &:focus {
                outline: none;

                &:after {
                  background-color: rgba(#fec23b, 0.9);
                }
              }

              &:after {
                content: '';
                height: 10px;
                width: 100%;
                background-color: rgba(#fec23b, 0.6);
                position: absolute;
                bottom: -1px;
                left: 0;
                z-index: -1;
              }
            }

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
}
</style>
