<template>
  <div class="shop-container">
    <section class="shop-header">
      <div class="img-container">
        <img class="shop-img" src="../assets/shirt_bed.jpg" alt="Shirts on a bed"/>
        <h1 class="vintage-clothing">Vintage Clothing</h1>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.shop-container {
  .shop-header {
    padding: 2rem;

    .img-container {
      position: relative;

      .shop-img {
        width: 100%;
        height: 100%;
      }

      .vintage-clothing {
        font-size: 2rem;
        color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 20px;
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

      .shop-img {
        width: 100%;
        height: 100%;
      }

      .vintage-clothing {
        font-size: 4rem;
        color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 20px;
      }
    }
  }
}
}
</style>
