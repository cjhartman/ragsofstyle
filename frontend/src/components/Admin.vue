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
            <label for="description">Description</label>
            <input name="description" id="description" type="text" maxlength="75"/>
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
          </div>
          <div>
            <button type="submit" class="go-button" @click.prevent="search">Get Photos</button>
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
        <div class="upload-button">
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
  }
}
</script>

<style lang="scss" scoped>
.admin-container {
  height: 100vh;
  padding: 0 25px;

  @media only screen and (min-width: 600px) {

  }
}
</style>
