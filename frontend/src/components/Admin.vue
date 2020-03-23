<template>
    <div class="admin-container">
      <header>
        <h1>Admin</h1>
        <h4><a to="/logout">Logout</a></h4>
      </header>
      <div class="upload-container">
        <form class="upload-form-group">
          <label for="title">Title</label>
          <input name="title" id="title" type="text" maxlength="30"/>
          <label for="description">Description</label>
          <input name="description" id="description" type="text" maxlength="75"/>
          <label for="color">Color</label>
          <input name="color" id="color" type="text" maxlength="75"/>
          <label for="size">Size</label>
          <select name="size" id="size" type="select">
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
          <label for="image">Select the image you are looking for</label>
          <select name="image" id="image" type="select">
            <option v-for="image in images" :key="image.id"></option>
          </select>
          <div class="upload-button">
           <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
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
    align-items: center;
    width: 100%;
  }

  .upload-container {
    height: 500px;
    justify-content: center;
    display: flex;

    label {
      font-size: 18px;
    }
    
    label, 
    input,
    select {
      width: 50vw;
      margin: 10px;
      padding: 5px;
      display: block;
    } 

    button {
      width: 20vw;
      padding: 5px;
      margin: 35px 10px 10px 10px;
    }

    .upload-button {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
