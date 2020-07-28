<template>
  <div class="home-container">
    <div class="hero">
      <section class="home-content">
        <div class="home-text-container">
          <h1 class="save-the-planet">Save the planet, buy vintage</h1>
          <div class="secondary-button-container">
            <router-link class="shop-now secondary-button-btn" to="/shop" tag="button">SHOP NOW</router-link>
          </div>
        </div>
        <div class="hero-img-container">
          <img class="hero-img" src="../assets/cold_boy.jpg" alt="Hero"/>
        </div>
      </section>
    </div>
    <section class="featured-content">
      <h2>Featured Content</h2>
      <div class="featured-content-images">
        <p v-if="loading">
            Loading...
        </p>
        <ul v-else>
         <li v-for="dbImage in showImages" :key="dbImage.title">
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
    </section>
    <section class="about-us">
      <h2>About Rags of Style</h2>
      <div>
        <div class="about-rags">
          <p>We are an environmentally focused, sustainable, social-first brand.</p>
          <p>
            Rags of Style is here to utilize the resources that are already on the earth in hopes to slow down the production of fast-fashion.
            Upcycling clothing is becoming more popular everyday and we are here to provide your old-school t-shirts to keep your wardrobe up-to-date.
            We are able to recycle these used yet quality "rags" and still stay in "style" without being wasteful.
          </p>
          <p>Shop second-hand and look amazing while protecting our planet!</p>
        </div>
        <div class="primary-button-container">
          <router-link class="primary-button-btn" to="/shop" tag="button">SHOP NOW</router-link>
        </div>
      </div>
    </section>
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
.home-container {
  box-sizing: border-box;
  width: 100%;
  display: inline-block;

  .hero {
    padding: 6rem 4rem;
    background-color: #F8F4F2;
    background-image: url('../assets/cold_boy.jpg');
    background-size: cover;

    .home-content {
      z-index: 1;
      position: relative;
      display: flex;
      height: 100%;

      .home-text-container {
        z-index: 10;
      }

        .hero-img {
          display: none;
        }

      .save-the-planet {
        margin: 0;
        position: relative;
        z-index: 2;
        color: #fec23b;
        font-size: 2rem;
        padding-bottom: 20px;
        max-width: 23.1875rem;

        &:after {
          content: "Save the planet, buy vintage";
          position: absolute;
          top: 3px;
          left: -3px;
          color: black;
          z-index: -1;
        }
      }

      .secondary-button-container {
        width: 7rem;

        .shop-now {
          width: 7rem;
        }
      }
    }
  }

  .featured-content {
    padding: 1rem 4rem;
    h2 {
      font-size: 1.75rem;
    }

    &-images {
      text-align: center;
      ul {
        display: block;

        li {
          padding: 10px 0;

          a {
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .about-us {
    padding: 1rem 4rem;
    background-color: #fec23b;
    text-align: center;

    h2 {
      font-size: 1.5rem;
      position: relative;
      display: inline-block;
      z-index: 1;
      padding: 0 20px;

      &:before {
        position: absolute;
        content: '';
        height: 50%;
        width: 100%;
        z-index: -1;
        bottom: 0;
        left: 0;
        background-color: white;
      }
    }

    .about-rags {
      line-height: 150%;
    }

    .primary-button-container {
      margin-top: 2rem;
      width: 12.5rem;
    }
  }
}

@media (min-width: 768px) {
  .home-container {
    .hero {
      background-color: #F8F4F2;
      background-image: none;
      min-height: 500px;

      .home-content {
        z-index: 1;
        position: relative;
        display: flex;
        min-height: inherit;
        align-items: center;

        .hero-img-container {
          position: absolute;
          right: 0;

          .hero-img {
            display: block;
            max-height: 425px;
          }
        }

        .save-the-planet {
          margin: 0;
          position: relative;
          z-index: 2;
          color: #fec23b;
          font-size: 3rem;
          padding-bottom: 20px;
          max-width: 27.1875rem;
        }
      }
    }

    .featured-content {
      padding: 3rem 4rem;
      h2 {
        font-size: 2.75rem;
      }

      &-images {
        text-align: left;

        ul {
          display: flex !important;
          justify-content: center;
          flex-flow: wrap;

          li {
            padding: 20px 20px 0 0;

            img {
              min-width: 250px;
            }
          }
        }
      }
    }

    .about-us {
      padding: 3rem 8rem;
      h2 {
        font-size: 2.25rem;
      }
    }
  }
}

@media (min-width: 1070px) {
  .home-container {
    .hero {
      padding: 6rem 8rem;

      .home-content {
        z-index: 1;
        position: relative;
        display: flex;
        height: 100%;

        .hero-img-container {
          .hero-img {
            display: block;
            max-height: 475px;
          }
        }

        .save-the-planet {
          font-size: 4rem;
          max-width: 44.1875rem;
        }
      }
    }

    .featured-content {
      padding: 2rem 8rem 4rem;

      &-images {
        text-align: left;

        ul {
          display: flex;
          justify-content: left;

          li {
            padding-right: 50px;

            img {
              max-width: 350px;
            }
          }
        }
      }
    }

    .about-us {
      padding: 3rem 12rem;
    }
  }
}

@media (min-width: 1440px) {
  .home-container {
    .hero {
      .home-content {
        z-index: 1;
        position: relative;
        display: flex;
        height: 100%;

        .hero-img-container {
          .hero-img {
            display: block;
            max-height: 525px;
          }
        }

        .save-the-planet {
          font-size: 4.125rem;
          max-width: 45.1875rem;
        }
      }
    }
  }
}

@media (min-width: 1600px) {
  .home-container {
    .hero {
      .home-content {
        .hero-img-container {
          .hero-img {
            display: block;
            max-height: 600px;
          }
        }

        .save-the-planet {
          font-size: 5.125rem;
          max-width: 45.1875rem;
        }
      }
    }
  }
}
</style>
