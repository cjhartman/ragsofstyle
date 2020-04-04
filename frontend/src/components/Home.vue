<template>
    <div>
        <label>
            Search:
            <input v-model="tag" type="text">
        </label>
        <button type="submit" class="go-button" @click.prevent="search">Search</button>
        <p v-if="loading">
            Loading...
        </p>
        <ul v-else>
          <li v-for="image in images" :key="image.id">
            <img :src="image.url_n">
          </li>
        </ul>
        <div class="upload-button">
            <button type="submit">Upload</button>
        </div>
    </div>
</template>

<script>
import getPhotos from '../services/FlickrService'
export default {
  data () {
    return {
      loading: false,
      tag: '',
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
  }
}
</script>

<style>
</style>
