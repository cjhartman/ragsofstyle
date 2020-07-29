<template>
  <div class="view-item-container">
    <section class="view-item">
      <div class="clothing-container">
        <img class="clothing-large-image" id="largeImage" :src="largeImg"/>
        <div class="clothing-large-thumb">
          <div class="clothing-large" v-for="image in imageSrc" :key="image.id">
            <img
              class="db-flickr-image"
              :src="image"
              @click="setChangeImage(image)"
            />
          </div>
        </div>
      </div>
      <div class="clothing-content">
        <h2 class="view-item-title">{{ sellingImage.title }}</h2>
        <p class="view-item-price">$ <span>{{ sellingImage.price }}</span></p>
        <p>
          <span class="view-item-color">Main color:</span>
          <span class="view-item-color-content">{{ sellingImage.color }}</span>
        </p>
        <p>
          <span class="view-item-size">Size:</span>
          <span class="view-item-size-content">{{ sellingImage.size }}</span>
        </p>
        <div class="secondary-button-container">
          <button class="secondary-button-btn" v-bind:class="{ 'disabled': isItemAddedToCart }" @click="addItemToCart(sellingImage)" :disabled="isItemAddedToCart">{{ cartBtnText }}</button>
        </div>
        <p class="view-item-processed">*All payments processed through Paypal</p>
        <p class="view-item-desc">Description:</p>
        <p class="view-item-desc-content">{{ sellingImage.description }}</p>
        <p class="view-item-details">Product Details:</p>
        <ul>
          <li v-for="detail in sellingImage.extras" :key="detail.id">
            <p class="view-item-extras-content">- {{ detail.value }}</p>
          </li>
        </ul>
      </div>
    </section>
    <MayLike></MayLike>
  </div>
</template>

<script>
import MayLike from './MayLike'
import getPhotos from '../services/FlickrService'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    MayLike
  },
  data () {
    return {
      loading: false,
      images: [],
      sellingImage: [],
      combinedImage: [],
      imageSrc: [],
      flickerItems: [],
      largeImg: '',
      id: 0,
      isItemAddedToCart: false,
      cartBtnText: 'Add to cart'
    }
  },
  computed: {
    ...mapGetters(['items', 'cart'])
  },
  methods: {
    ...mapActions([
      'getItem',
      'addToCart'
    ]),
    search () {
      this.loading = true
      this.fetchImages()
      this.loading = false
    },
    fetchImages () {
      return getPhotos('people.getPublicPhotos').then((response) => {
        this.images = response.data.photos.photo
        this.grabPic()
        this.showDBImages()
        this.getImageSrc()
        this.largeImg = this.imageSrc[0]
      })
    },
    scrollTop () {
      window.scrollTo(0, 0)
    },
    showDBImages () {
      this.combinedImage = this.sellingImage.selectedFlickrImage.map((value, index) => {
        return {
          id: value,
          secret: this.sellingImage.secret[index],
          farm: this.sellingImage.farmId,
          server: this.sellingImage.serverId
        }
      })
    },
    getImageSrc () {
      this.combinedImage.forEach(combine => {
        this.imageSrc.push('https://farm' + combine.farm + '.staticflickr.com/' + combine.server + '/' + combine.id + '_' + combine.secret + '.jpg')
      })
      return this.imageSrc
    },
    grabPic () {
      this.items.forEach((image) => {
        if (this.id === image._id) {
          this.sellingImage = image
        }
      })
    },
    setChangeImage (img) {
      this.largeImg = img
    },
    addItemToCart (item) {
      let cartItem = {
        title: item.title,
        color: item.color,
        size: item.size,
        price: item.price,
        description: item.description,
        selectedFlickrImage: item.selectedFlickrImage,
        dateAdded: item.dateAdded,
        sale: item.sale,
        serverId: item.serverId,
        farmId: item.farmId,
        secret: item.secret,
        _id: item._id
      }
      this.addToCart(cartItem).then(res => {
        if (res) {
          this.isItemAlreadyInCart()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    isItemAlreadyInCart () {
      for (let item of this.cart) {
        if (item._id === this.sellingImage._id) {
          this.isItemAddedToCart = true
          this.cartBtnText = 'Item is in your cart'
        }
      }
    }
  },
  created () {
    this.getItem()
    this.id = this.$route.params.id
  },
  beforeMount () {
    this.fetchImages()
    this.scrollTop()
  },
  beforeUpdate () {
    this.isItemAlreadyInCart()
  }
}
</script>

<style lang="scss" scoped>
.view-item-container {
  padding: 2rem;
  min-height: 62vh;
  .view-item {

    &-color, &-size, &-desc, &-details {
      font-family: 'Shrikhand', cursive;
      font-size: 1.25rem;
    }

    .clothing-container {
      text-align: center;

      .clothing-large-image {
        max-width: 300px;
        display: none;
      }

      .clothing-large-thumb {
        display: flex;
        flex-flow: wrap;
        justify-content: center;

        .clothing-large {
          position: relative;
          text-align: center;

          .db-flickr-image {
            max-width: 275px;
            position: relative;
            cursor: pointer;
          }
        }
      }
    }

    .clothing-content {
      .view-item-price {
        font-size: 1.5rem;
      }
      .view-item-color-content,
      .view-item-size-content,
      .view-item-desc-content,
      .view-item-extras-content {
        font-size: 1.25rem;
      }

      .view-item-extras-content {
        margin: 0;
      }

      .disabled {
        background-color: #aaa;
        border: 3px solid #aaa;
      }
    }
  }
}

@media (min-width: 900px) {
  .view-item-container {
    padding: 4rem;
    min-height: 53vh;

    .view-item {
      display: flex;
      justify-content: space-evenly;

      .clothing-container {
        text-align: left;

        .clothing-large-image {
          display: block;
          max-width: 500px;
          margin-bottom: 10px;
        }

        .clothing-large-thumb {
          display: flex;
          flex-flow: wrap;
          max-width: 500px;
          justify-content: left;

          .clothing-large {
            position: relative;

            .db-flickr-image {
              max-width: 115px;
              position: relative;
              cursor: pointer;
              margin-right: 9px;
            }
          }
        }
      }

      .clothing-content {
        margin-left: 50px;
        width: 30%;

        .view-item {
          &-title {
            font-size: 3rem;
            margin: 0;
          }

          &-price {
            font-size: 2rem;
            margin: .5rem 0 1.5rem 0;
          }

          &-color, &-size, &-desc, &-details {
            font-family: 'Shrikhand', cursive;
            font-size: 1.25rem;
          }

          &-processed {
            font-size: .9rem;
            padding-bottom: 2rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid gray;
          }
        }
      }
    }
  }
}
</style>
