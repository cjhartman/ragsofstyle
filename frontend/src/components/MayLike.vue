<template>
  <div class="may-like-container">
    <h2 class="may-like-header">You may also like:</h2>
    <div class="may-like-content">
      <p v-if="loading">
          Loading...
      </p>
      <ul v-else>
        <li v-for="dbImage in showImages" :key="dbImage.title" @click="refreshPage">
          <router-link :to="{ name: 'View Item', params: { id: dbImage.id } }">
            <img class="db-flickr-image" :src="dbImage.url">
          </router-link>
          <div class="item-title-price">
            <div class="item-title-price-content">
              <p class="item-title">{{ dbImage.title }}</p>
              <p>$ {{ dbImage.price }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import getPhotos from '../services/FlickrService'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      images: [],
      flickrImages: [],
      flickerItems: [],
      showImages: []
    }
  },
  computed: {
    ...mapGetters(['items'])
  },
  methods: {
    ...mapActions([
      'getItem'
    ]),
    search () {
      this.loading = true
      this.fetchImages()
      this.loading = false
    },
    fetchImages () {
      return getPhotos('people.getPhotos').then((response) => {
        this.flickrImages = response.data.photos.photo
        this.flickerItems = this.items
        this.showDbFlickrImage()
      })
    },
    showDbFlickrImage () {
      let dbImageId
      let dbSecretId
      let dbFarmId
      let dbServerId
      let itemObj = {}
      for (let item of this.flickerItems) {
        for (let firstImageInArray of item.selectedFlickrImage) {
          dbImageId = firstImageInArray
        }
        for (let firstSecretInArray of item.secret) {
          dbSecretId = firstSecretInArray
        }
        dbFarmId = item.farmId
        dbServerId = item.serverId
        itemObj = Object.assign({'id': item._id, 'price': item.price, 'title': item.title, 'url': 'https://farm' + dbFarmId + '.staticflickr.com/' + dbServerId + '/' + dbImageId + '_' + dbSecretId + '.jpg'})
        this.showImages.push(itemObj)
      }
      return this.showImages
    },
    refreshPage () {
      this.$router.go()
    }
  },
  created () {
    this.getItem()
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
        padding: 10px 0;

        img {
          width: 100%;
        }

        .item-name {
          font-weight: 700;
        }
      }
    }
  }
}

@media (min-width: 900px) {
  .may-like-container {
    .may-like-header {
      font-size: 1.125rem;
    }

    .may-like-content {
      ul {
        justify-content: left;
        li {
          margin-right: 50px;

          img {
            max-width: 350px;
          }
        }
      }
    }
  }
}

</style>
