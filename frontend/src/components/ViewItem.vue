<template>
  <div class="view-item-container">
    <section class="view-item">
      <div class="clothing-large">

      </div>
      <div class="clothing-content">
        <h2>Name of Item</h2>
        <p>$ <span>Price</span></p>
        <p>
          <span>Main color:</span>
          <span>Color</span>
        </p>
        <p>
          <span>Size:</span>
          <span>The size</span>
        </p>
        <div class="secondary-button-container">
          <button>Add To Cart</button>
        </div>
        <p>*All payments processed through Paypal</p>
        <hr>
        <p>Description:</p>
        <p>Dynamica Desc</p>
        <p>Product Details:</p>
        <ul>
          <li>dynamic details</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import getPhotos from '../services/FlickrService'
export default {
  created () {
    this.params = this.$route.params.id
    console.log(this.params)
  },
  data () {
    return {
      loading: false,
      images: []
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
    }
  },
  beforeMount () {
    this.fetchImages()
  }
}

</script>

<style lang="scss" scoped>
.view-item-container {
  padding: 2rem;
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
    .view-item {
      display: flex;
      justify-content: space-between;
      
      .clothing-large {

      }

      .clothing-content {
      
      }
    }
  }
}
</style>
