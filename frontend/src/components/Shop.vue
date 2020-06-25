<template>
  <div class="shop-container">
    <section class="shop-header">
      <div class="img-container">
        <img class="shop-img" src="../assets/shirt_bed.jpg" alt="Shirts on a bed"/>
        <h1 class="vintage-clothing">Vintage Clothing</h1>
      </div>
    </section>
    <section class="shop-items">
      <div class="shop-items-header">
        <h2>
          Shop
        </h2>
        <select class="filter-items">
          <option>Sale</option>
          <option>New Arrivals</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
      <div class="items-for-sale">
        <p v-if="loading">
            Loading...
        </p>
        <ul v-else>
          <li v-for="dbImage in showImages" :key="dbImage.title">
            <router-link to="">
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
    </section>
  </div>
</template>

<script>
import getPhotos from '../services/FlickrService'
import Items from '../warehouse/Items'
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
        this.flickerItems = Items.state.items
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
.shop-container {
  .shop-header {
    padding: 2rem;
    background-color: #F8F4F2;

    .img-container {
      position: relative;

      .shop-img {
        width: 100%;
        height: 100%;
      }

      .vintage-clothing {
        font-size: 2rem;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 20px;
        color: #F8F4F2;
      }
    }
  }

  .shop-items {
    padding: 2rem;

    .shop-items-header{
      padding-bottom: 2rem;

      h2 {
        margin: 0;
        padding-bottom: 10px;
      }

      .filter-items {
        width: 55%;
        height: 50px;
      }
    }

    .items-for-sale {
      text-align: center;
      ul {
        display: block;

        li {
          padding: 10px 0;

          .item-name {
            font-weight: 700;
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .shop-container {
    .shop-header {
      padding: 4rem;

      .img-container {
        position: relative;
        max-height: 600px;

        .shop-img {
          height: 600px;
          object-fit: cover;
        }

        .vintage-clothing {
          font-size: 4rem;
          color: #F8F4F2;;
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 0 20px;
        }
      }
    }

    .shop-items {
      padding: 4rem;

      .shop-items-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        h2 {
          font-size: 2.75rem;
        }

        .filter-items {
          width: 25%;
        }
      }

      .items-for-sale {
        text-align: left;

        ul {
          display: flex !important;
          justify-content: space-between;
          flex-flow: wrap;

          li {
            padding-top: 20px;

            &:not(:first-of-type) {
              padding-left: 20px;
            }

            .item-title-price {
              display: flex;
              max-width: 350px;
            }

            img {
              min-width: 250px;
              max-width: 350px;
            }

            p {
              font-size: 1.25rem;
            }
          }
        }
      }
    }
  }
}
</style>
