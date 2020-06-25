<template>
  <div class="view-item-container">
    <section class="view-item" v-for="image in sellingImage" :key="image.id">
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
        <h2 class="view-item-title">{{ image.title }}</h2>
        <p class="view-item-price">$ <span>{{image.price}}</span></p>
        <p>
          <span class="view-item-color">Main color:</span>
          <span class="view-item-color-">{{ image.color }}</span>
        </p>
        <p>
          <span class="view-item-size">Size:</span>
          <span>{{ image.size }}</span>
        </p>
        <div class="secondary-button-container">
          <button class="secondary-button-btn">Add To Cart</button>
        </div>
        <p class="view-item-processed">*All payments processed through Paypal</p>
        <p class="view-item-desc">Description:</p>
        <p>{{ image.description }}</p>
        <p class="view-item-details">Product Details:</p>
        <ul>
          <li v-for="detail in image.extras" :key="detail.id">- {{ detail }}</li>
        </ul>
      </div>
    </section>
    <MayLike></MayLike>
  </div>
</template>

<script>
import MayLike from './MayLike'
import getPhotos from '../services/FlickrService'
export default {
  props: ['flickerItems'],
  components: {
    MayLike
  },
  created () {
    this.params = this.$route.params.id
  },
  data () {
    return {
      loading: false,
      images: [],
      sellingImage: [],
      combinedImage: [],
      imageSrc: [],
      largeImg: ''
    }
  },
  methods: {
    search () {
      this.loading = true
      this.fetchImages()
      this.loading = false
    },
    fetchImages () {
      return getPhotos('people.getPublicPhotos', {
        page: 1,
        per_page: 30
      }).then((response) => {
        this.images = response.data.photos.photo
        this.showDBImages()
        this.getImageSrc()
        this.largeImg = this.imageSrc[0]
      })
    },
    scrollTop () {
      window.scrollTo(0, 0)
    },
    showDBImages () {
      for (let item of this.sellingImage) {
        this.combinedImage = item.selectedFlickrImage.map((value, index) => {
          return {
            id: value,
            secret: item.secret[index],
            farm: item.farmId,
            server: item.serverId
          }
        })
      }
    },
    getImageSrc () {
      this.combinedImage.forEach(combine => {
        this.imageSrc.push('https://farm' + combine.farm + '.staticflickr.com/' + combine.server + '/' + combine.id + '_' + combine.secret + '.jpg')
      })
      return this.imageSrc
    },
    setChangeImage (img) {
      this.largeImg = img
    }
  },
  beforeMount () {
    this.fetchImages()
    this.scrollTop()
  },
  mounted () {
    if (this.flickerItems) {
      this.sellingImage = this.flickerItems
    }
  }
}
</script>

<style lang="scss" scoped>
.view-item-container {
  padding: 2rem;
  min-height: 62vh;
  .view-item {
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
    }
  }
}

@media (min-width: 768px) {
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
