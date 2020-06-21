<template>
  <div class="admin-container" v-if="isLoggedIn">
    <header>
      <h1 class="admin-portal">Admin Portal</h1>
      <div class="admin-header-right">
        <h4>{{ user.name }}</h4>
        <h4><a to="/logout" @click.prevent="logoutUser">Logout</a></h4>
      </div>
    </header>
    <div class="admin-content">
      <form class="upload-form-group" @submit.prevent="uploadPhotos">
        <div class="input-content">
          <div class="input-content-items">
            <label for="title">Title</label>
            <input name="title" type="text" v-model="title" maxlength="30"/>
            <label for="color">Color</label>
            <input name="color" type="text" v-model="color" maxlength="75"/>
            <label for="price">Price</label>
            <input name="price" type="number" v-model="price" min="1" step="any" maxlength="5"/>
            <label for="size">Size</label>
            <select name="size" type="select" v-model="size">
              <option disabled value="">Please choose a size</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <label for="description">Description</label>
            <textarea name="description" type="text" v-model="description" maxlength="150"/>
            <label for="extra">
              Extra Product Details - Click the "+ Add New"
              button to add an extra bit of info to your item for sale
            </label>
            <div class="extras" v-for="extra in extras" :key="extra.id">
              <input v-model="extra.value"/>
              <div class="button-container add-extra">
                <button type="button"
                  @click="deleteProductDetail(extra.id)">
                  Delete
                </button>
              </div>
            </div>
            <div class="secondary-button-container add-extra">
              <button class="secondary-button-btn" type="button" @click="addProductDetail">+ Add New</button>
            </div>
            <div class="sale-container">
              <label class="sale-checkbox-label" for="sale">
                <input name="sale" type="checkbox" v-model="sale">
                <span class="checkmark"></span>
              </label>
              <label>Add a "Sale" sign</label>
            </div>
          </div>
          <div class="input-content-images">
            <p>Select the images associated with your item</p>
            <p v-if="loading">
              Loading...
            </p>
            <ul v-else class="image-container">
              <li class="image-list" v-for="image in flickrImages" :key="image.id">
                <label class="fancy-checkbox-label" :for="image.id">
                  <input type="checkbox" :id="image.id" :value="image" v-model="selectedImages">
                  <span class="fancy-checkbox fancy-checkbox-img"></span>
                  <img class="images" :src="image.url_n">
                </label>
                <div>Image Id #: {{ image.id }}</div>
              </li>
            </ul>
          </div>
          <div class="db-images-content">
            <p>These are your published posts - click post to edit</p>
            <p v-if="loading">
              Loading...
            </p>
            <ul v-else class="image-container">
              <li class="image-list" v-for="item in flickerItems" :key="item.id" >
                <label class="fancy-checkbox-label" :for="item._id">
                  <input type="checkbox" :id="item._id" :value="item" v-model="dbSelectedItem" @change="editPost()">
                  <span class="fancy-checkbox fancy-checkbox-img"></span>
                  <img class="images" :src="showDbFlickrImage()">
                  <div>{{ item.title }}</div>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="secondary-button-container">
          <button class="secondary-button-btn" type="submit">{{ uploadEdit }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import getPhotos from '../services/FlickrService'
import Upload from '../warehouse/Upload'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      flickrImages: [],
      selectedImages: [],
      title: '',
      color: '',
      size: '',
      description: '',
      price: '',
      extras: [],
      sale: false,
      selectedFlickrImage: [],
      serverId: '',
      farmId: '',
      secret: [],
      flickerItems: [],
      uploadEdit: 'Upload Post',
      dbSelectedItem: [],
      updateSelectedItem: ''
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user', 'items'])
  },
  methods: {
    ...mapActions([
      'logout',
      'getAdminProfile',
      'upload',
      'getItem'
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
      return getPhotos('people.getPhotos').then((response) => {
        this.flickrImages = response.data.photos.photo
        this.flickerItems = Upload.state.items
      })
    },
    showDbFlickrImage () {
      let dbImageId
      let dbSecretId
      let dbFarmId
      let dbServerId
      for (let item of this.flickerItems) {
        dbImageId = item.selectedFlickrImage[0]
        dbSecretId = item.secret[0]
        dbFarmId = item.farmId
        dbServerId = item.serverId
      }
      return 'https://farm' + dbFarmId + '.staticflickr.com/' + dbServerId + '/' + dbImageId + '_' + dbSecretId + '.jpg'
    },
    addProductDetail () {
      this.extras.push({
        value: ''
      })
    },
    deleteProductDetail (index) {
      this.extras.splice(index, 1)
    },
    uploadPhotos () {
      this.getMetaDataFromImage()
      let photos = {
        title: this.title,
        color: this.color,
        size: this.size,
        description: this.description,
        price: this.price,
        extras: this.extras,
        selectedFlickrImage: this.selectedFlickrImage,
        sale: this.sale,
        serverId: this.serverId,
        farmId: this.farmId,
        secret: this.secret
      }
      this.upload(photos).then(res => {
        if (res.status === 201) {
          this.$router.go()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getMetaDataFromImage () {
      for (let selected of this.selectedImages) {
        this.serverId = selected.server
        this.farmId = selected.farm
        this.selectedFlickrImage.push(selected.id)
        this.secret.push(selected.secret)
      }
    },
    editPost () {
      if (this.dbSelectedItem.length) {
        this.uploadEdit = 'Update Post'
        this.populateFields()
        return this.uploadEdit
      } else {
        this.uploadEdit = 'Upload Post'
        this.unpopulateFields()
        return this.uploadEdit
      }
    },
    populateFields () {
      debugger
      for (let addItem of this.dbSelectedItem) {
        this.title = addItem.title
        this.color = addItem.color
        this.size = addItem.size
        this.description = addItem.description
        this.price = addItem.price
        this.extras = addItem.extras
        this.sale = addItem.sale
        this.selectedFlickrImage = addItem.selectedFlickrImage
      }
    },
    unpopulateFields () {
      this.title = ''
      this.color = ''
      this.size = ''
      this.description = ''
      this.price = ''
      this.extras = ''
      this.sale = ''
      this.selectedFlickrImage = ''
    }
  },
  created () {
    this.getItem()
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

  .admin-portal {
    position: relative;

    &:after {
        content: "Admin Portal";
        position: absolute;
        top: 2px;
        left: -2px;
        color: #fec23b;
        z-index: -1;
    }
  }

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

        .extras {
          margin-top: 10px;
          display: flex;

          input {
            margin-right: 10px;
          }
        }

        .sale-container {
          padding: 10px 0;
          display: flex;
          align-items: center;
        }

        .add-extra {
          margin-top: 10px;
        }

        textarea {
          resize: none;
        }

        .sale-checkbox-label input {
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          width: 20px;
          height: 20px;
          margin: 2px;
        }

        .sale-checkbox-label {
          display: inline-block;
          position: relative;
          user-select: none;
          width: 30px;
          margin-right: 10px;
        }

        .sale-checkbox-label .checkmark {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: white;
          position: absolute;
          left: 0;
          top: 0;
          border: 2px solid black;
        }

        .sale-checkbox-label input:checked + .checkmark {
          background-color: #f26f63;
          border: 2px solid black;
        }

        .sale-checkbox-label input:checked + .checkmark:after {
          content: "";
          position: absolute;
          height: 6px;
          width: 11px;
          border-left: 2px solid white;
          border-bottom: 2px solid white;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }

      .image-container {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: 20px 0;
        padding: 0;
        max-height: 500px;
        overflow-y: scroll;

        .image-list {
          list-style: none;
          display: block;
          position: relative;
          padding-bottom: 1rem;

          img {
            max-height: 200px;
          }

          .fancy-checkbox-label > input[type=checkbox] {
            position: absolute;
            opacity: 0;
            cursor: inherit;
          }

          .fancy-checkbox-label {
            font-weight: normal;
            cursor: pointer;
          }

          .fancy-checkbox:before {
            content: "";
            background: #fff;
            color: transparent;
            z-index: 1;
            width: 1.25rem;
            height: 1.25rem;
          }

          .fancy-checkbox-label:hover > input:not(:checked) + .fancy-checkbox:before {
            color: #000000;
          }

          input:checked + .fancy-checkbox:before {
            color: #fff;
            background: #f26f63;
            border-color: #f26f63;
            animation: shrink forwards;
          }

          .fancy-checkbox-img:before {
            position: absolute;
            margin: 3px;
            line-height: normal;
          }

          input:checked + .fancy-checkbox-img + img {
            animation: shrink .5s forwards;
          }

          input:not(:checked) + .fancy-checkbox-img + img {
            animation: unshrink .5s forwards;
          }

          @keyframes shrink {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(0.9);
            }
          }
          @keyframes unshrink {
            0% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
            }
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

      &-items {
        width: 30%;
        margin-right: 30px;
      }

      &-images {
        width: 30%;
        margin-right: 30px;
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
