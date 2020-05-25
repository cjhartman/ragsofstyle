<template>
  <div class="may-like-container">
    <h2 class="may-like-header">You may also like:</h2>
    <div class="may-like-content">
      <p v-if="loading">
          Loading...
      </p>
      <ul v-else>
        <li v-for="image in images" :key="image.id">
          <router-link to="/view-item">
            <img :src="image.url_n">
          </router-link>
          <p class="item-name">{{image.title}}</p>
          <p>$ <span>Price</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import getPhotos from '../services/FlickrService'
export default {
  created () {
    this.params = this.$route.params.id
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
.may-like-container {
  margin-top: 3.125rem;
  padding-top: 3.125rem;
  border-top: 1px solid #cccccc;

  .may-like-header {
    font-size: 1rem;
  }

  .may-like-content {
    ul {
      display: flex;
      flex-flow: wrap;
      justify-content: center;
      li {
        padding-right: 10px;

        .item-name {
          font-weight: 700;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .may-like-container {
    .may-like-header {
      font-size: 1.125rem;
    }

    .may-like-content {
      ul {
        justify-content: space-between;
      }
    }
  }
}

</style>
