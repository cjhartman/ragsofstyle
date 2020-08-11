<template>
  <div class="modal" v-show="value">
    <div class="container">
      <div class="content">
        <p class="modal__title">Are you sure you want to delete this item?</p>
        <div class="secondary-button-container">
          <button @click="handleDelete()"
          class="secondary-button-btn">Delete</button>
        </div>
        <div class="secondary-button-container">
          <button @click.prevent="close"
          class="secondary-button-btn">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Modal',
  props: {
    value: {
      required: true
    },
    id: {
      type: String
    }
  },
  methods: {
    ...mapActions([
      'deleteItem'
    ]),
    close () {
      this.$emit('input', !this.value)
    },
    handleDelete () {
      this.deleteItem(this.id).then(res => {
        if (res.status === 204) {
          this.$router.go()
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);

  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 25%;
      background-color: white;
      padding: 2rem;

      .secondary-button-container:first-of-type {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
