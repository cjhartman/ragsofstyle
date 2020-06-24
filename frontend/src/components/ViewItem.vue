<template>
  <div class="view-item-container">
    <section class="view-item" v-for="image in sellingImage" :key="image.id">
      <div class="clothing-container">
        <div class="clothing-large" v-for="combine in combinedImage" :key="combine.id">
          <img class="db-flickr-image" :src="'https://farm' + combine.farm + '.staticflickr.com/' + combine.server + '/' + combine.id + '_' + combine.secret + '.jpg'">
        </div>
      </div>
      <div class="clothing-content">
        <h2>{{ image.title }}</h2>
        <p>$ <span>{{image.price}}</span></p>
        <p>
          <span>Main color:</span>
          <span>{{ image.color }}</span>
        </p>
        <p>
          <span>Size:</span>
          <span>{{ image.size }}</span>
        </p>
        <div class="secondary-button-container">
          <button class="secondary-button-btn">Add To Cart</button>
        </div>
        <p>*All payments processed through Paypal</p>
        <p>Description:</p>
        <p>{{ image.description }}</p>
        <p>Product Details:</p>
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
      combinedImage: []
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
      
      .clothing-large {
        position: relative;
        text-align: center;

        .db-flickr-image {
          max-width: 275px;
        }
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
          
        .clothing-large {
          position: relative;
        }

        .clothing-content {
          width: 45%;
        }
      }
    }
  }
}
</style>
