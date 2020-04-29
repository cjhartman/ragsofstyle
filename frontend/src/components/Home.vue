<template>
  <div class="home-container">
    <div class="hero">
      <section class="home-content">
        <div class="home-text-container">
          <h1 class="save-the-planet">Save the planet, buy vintage</h1>
          <div class="secondary-button-container">
            <button class="shop-now">SHOP NOW</button>
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
          <li v-for="image in images" :key="image.id">
            <a>{{ image }}<img :src="image.url_n"></a>
          </li>
        </ul>
      </div>
    </section>
    <section class="about-us">
      <h2>About Us</h2>
      <div>
        <p>
          We’re an environmentally focused, sustainabale, social-first brand. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
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
    background-image: url('../assets/cold_boy.jpg');
    background-size: cover;

    .home-content {
      z-index: 1;
      position: relative;
      display: flex;
      height: 100%;

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

          img {
            max-height: 100%;
            max-width: 100%
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

    .about-us {
      padding: 3rem 8rem;
      h2 {
        font-size: 2.25rem;
      }
    }
  }
}

@media (min-width: 1024px) {
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
          justify-content: space-between;
          flex-flow: nowrap;

          li {
            width: 25%;
            padding-right: 20px;
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
