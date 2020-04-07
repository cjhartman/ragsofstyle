<template>
  <div>
    <nav class="navbar-container">
      <div class="navbar">
        <img class="ros-img" src="../assets/ros-logo-black.svg"/>
        <div class="links">
          <router-link
            v-for="routes in links"
            :key="routes.id"
            :to="`${routes.page}`">{{ routes.text }}
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data () {
    return {
      links: [
        {
          id: 0,
          text: 'Shop',
          page: '/shop'
        },
        {
          id: 1,
          text: 'About',
          page: '/about'
        },
        {
          id: 2,
          text: 'FAQs',
          page: '/faqs'
        },
        {
          id: 3,
          text: 'Cart',
          page: '/cart'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  background-color: #fec23b;

  .navbar {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ros-img {
      height: 60px;
    }

    .links {
      a {
        &:not(:last-child) {
          padding-right: 20px;
        }

        &:hover {
          color: #f26f63;
          text-shadow: 0 0 10px #f26f63;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .navbar-container {
    padding: 1rem 4rem;
  }
}

@media (min-width: 1024px) {
  .navbar-container {
      padding: 1rem 8rem;
  }
}

</style>
