<template>
  <div class="admin-container" v-if="isLoggedIn">
    <header>
      <h1>Admin Portal</h1>
      <div class="admin-header-right">
        <h4>{{ user.name }}</h4>
        <h4><a to="/logout" @click.prevent="logoutUser">Logout</a></h4>
      </div>
    </header>
    <div class="admin-content">
      <form class="upload-form-group">
        <div class="input-content">
          <div class="input-content-items">
            <label for="title">Title</label>
            <input name="title" id="title" type="text" maxlength="30"/>
            <label for="color">Color</label>
            <input name="color" id="color" type="text" maxlength="75"/>
            <label for="description">Price</label>
            <input name="price" id="price" type="number" min="1" step="any" maxlength="5"/>
            <label for="size">Size</label>
            <select name="size" id="size" type="select">
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <label for="description">Description</label>
            <textarea name="description" id="description" type="text" maxlength="150"/>
          </div>
          <div class="input-content-images">
            <p>Select the images associated with your item</p>
            <p v-if="loading">
              Loading...
            </p>
            <ul v-else class="image-container">
              <li class="image-list" v-for="image in images" :key="image.id">
                <img class="images" :src="image.url_n">
              </li>
            </ul>
          </div>
        </div>
        <div class="button-container">
          <button type="submit">Upload</button>
        </div>
      </form>
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
      images: []
    }
  },
  computed: mapGetters(['isLoggedIn', 'user']),
  methods: {
    ...mapActions([
      'logout',
      'getAdminProfile'
    ]),
    logoutUser () {
      this.logout()
    },
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
  created () {
    this.getAdminProfile()
  },
  beforeMount () {
    this.fetchImages()
  }
}
</script>

<style lang="scss" scoped>
.admin-container {
  height: 100vh;
  padding: 0 25px;

  header {
    display: flex;
    justify-content: space-between;

    .admin-header-right {
      display: flex;
      align-items: center;

      h4:first-child {
        padding-right: 10px;
      }
    }
  }

  .admin-content {
    margin-bottom: 20px;

    .input-content {
      border-bottom: 3px solid black;
      margin-bottom: 20px;

      &-items {
        margin-bottom: 20px;

        label,
        input,
        select,
        textarea {
          width: 100%;
          display: block;
          padding: 10px 0;
        }

        input,
        select,
        textarea {
          border: 3px solid black;
          padding: 10px 5px;
          box-sizing: border-box;

          &:focus {
            outline: none;
            border: 3px solid #fec23b;
            box-shadow: 0 2px 5px rgba($color: #fec23b, $alpha: .8);
          }
        }

        textarea {
          resize: none;
        }
      }

      .image-container {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: 20px 0;
        padding: 0;

        .image-list {
          list-style: none;
          display: block;

          img {
            max-height: 200px;
          }
        }
      }
    }

    .button-container {
      width: 100%;
      position: relative;
      display: inline-block;
      background-color: black;

      &:before,
      &:after {
        content: '';
        display: block;
        background-color: black;
        width: 8px;
        height: 8px;
        position: absolute;
        transition: all .15s ease;
      }

      &:before {
        top: 0;
        left: 0;
        transform-origin: top left;
        transform: rotate(-45deg) scale(0);
      }

      &:after {
        right: 0;
        bottom: 0;
        transform-origin: bottom right;
        transform: rotate(45deg) scale(0);
      }

      button {
        width: 100%;
        display: block;
        transform: translate(0, 0);
        transition: all .15s ease;
        position: relative;
        z-index: 10;
        border: 3px solid black;
        background-color: white;
        padding: 5px;
        outline: none;
      }

      &:hover button {
        transform: translate(6px, -6px);
      }

      &:hover:before {
        transform: rotate(-45deg) scale(1);
      }

      &:hover:after {
        transform: rotate(45deg) scale(1);
      }
    }
  }

  @media (min-width: 550px) {
    .image-container {
      flex-flow: wrap !important;
      justify-content: space-between;
      margin: 20px 0;
      padding: 0;
    }
  }

  @media (min-width: 768px) {
    .input-content {
      display: flex;
      justify-content: space-between;

      &-items {
        width: 45%;
      }

      &-images {
        width: 45%;
      }
    }

    .image-container {
      flex-flow: column !important;
      text-align: left !important;
      justify-content: space-between;
      margin: 20px 0;
      padding: 0;
    }
  }

  @media (min-width: 1024px) {
    .image-container {
      flex-flow: row !important;
      flex-flow: wrap !important;
      justify-content: initial;

      .image-list {
        padding-right: 10px;
      }
    }
  }
}
</style>
