<template>
  <div class="view-item-container">
    <section class="view-item" v-for="image in sellingImage" :key="image.id">
      <div class="clothing-large">

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
          <li v-for="detail in image" :key="detail">{{ detail }}</li>
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
      sellingImage: []
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
      })
    },
    scrollTop () {
      window.scrollTo(0, 0)
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
    .clothing-large {

    }

    .clothing-content {

    }
  }
}

@media (min-width: 768px) {
  .view-item-container {
    padding: 4rem;
    min-height: 53vh;

    .view-item {
      display: flex;
      justify-content: space-between;

      .clothing-large {
        width: 50%;
      }

      .clothing-content {
        width: 50%;
      }
    }
  }
}
</style>
