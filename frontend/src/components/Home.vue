<template>
  <div class="home-container">
    <div class="hero">
      <section class="home-content">
        <h1 class="save-the-planet">Save the planet, buy vintage</h1>
        <div class="secondary-button-container">
          <button class="shop-now">SHOP NOW</button>
        </div>
        <img class="hero-img" src="../assets/cold_boy.jpg" alt="Hero"/>
      </section>
    </div>
    <section class="featured-content">
      <h2>Featured Content</h2>
      <div class="featured-content-images">
        <p v-if="loading">
            Loading...
        </p>
        <ul v-else>
          <li v-for="image in images" :key="image.id">
            <a><img :src="image.url_n"></a>
          </li>
        </ul>
      </div>
    </section>
    <section>

    </section>
  </div>
</template>

<script>
import getPhotos from '../services/FlickrService'
export default {
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
.home-container {
  box-sizing: border-box;
  width: 100%;
  display: inline-block;

  .hero {
    padding: 6rem 4rem;
    background-color: #F8F4F2;

    .home-content {
      z-index: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;

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

          img {
            max-height: 100%;
            max-width: 100%
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .home-container {
    .hero {
      padding: 6rem 4rem;
      background-color: #F8F4F2;

      .home-content {
        z-index: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;

        .hero-img {
          position: absolute;
          max-width: 60%;
          right: 0;
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
        font-size: 2.25rem;
      }

      &-images {
        text-align: left;

        ul {
          display: flex !important;
          justify-content: space-between;

          li {
            padding: 20px 20px 0 0;
          }
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .home-container {
    .home-content {
      padding: 0 4rem;
      z-index: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;

      .hero-img {
        position: absolute;
        max-width: 60%;
        right: 0;
      }
    }

    .featured-content {
      padding: 2rem 8rem 4rem;

      h2 {
        font-size: 2.25rem;
      }

      &-images {
        text-align: left;

        ul {
          display: flex;
          justify-content: space-between;
          flex-flow: nowrap;

          li {
            width: 25%;
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>
