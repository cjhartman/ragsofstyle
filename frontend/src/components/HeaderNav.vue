<template>
  <div v-if="!$route.meta.hideNavigation">
    <nav class="navbar-container">
      <div class="navbar">
        <router-link to="/home">
          <img class="ros-img" src="../assets/ros-logo-cream-black.svg"/>
        </router-link>
        <div v-bind:class="{ 'hamburger-active': isShowNav }" class="hamburger-icon-container" @click="isShowNav = !isShowNav">
          <div class="hamburger-icon"></div>
        </div>
        <div class="links">
          <router-link
            v-for="routes in links"
            :key="routes.id"
            :to="`${routes.page}`">{{ routes.text }}
          </router-link>
        </div>
      </div>
    </nav>
    <transition name="slide">
      <div class="hidden-nav" v-if="isShowNav">
        <ul class="hidden-nav-links">
          <li class="hidden-nav-links-items" v-for="routes in links" :key="routes.id" @click="isShowNav = !isShowNav">
            <router-link
              :to="`${routes.page}`">{{ routes.text }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
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
      ],
      isShowNav: false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container {
  background-color: #fec23b;
  padding: 0 1rem;

  .navbar {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ros-img {
      height: 60px;
    }

    .hamburger-icon-container {
      width: 40px;
      cursor: pointer;
      z-index: 100;

      &:before,
      &:after {
        background-color: black;
        border-radius: 3px;
        content: '';
        display: block;
        height: 4px;
        margin: 6px 4px;
        transition: all .2s ease-in-out;
      }

      .hamburger-icon {
        background-color: black;
        border-radius: 3px;
        content: '';
        display: block;
        height: 4px;
        margin: 6px 0;
        transition: all .2s ease-in-out;
      }
    }

    .hamburger-active {
      &:before {
        transform: translateY(10px) rotate(135deg);
      }

      &:after {
        transform: translateY(-10px) rotate(-135deg);
      }

      .hamburger-icon {
        transform: scale(0);
      }
    }

    .links {
      display: none;

      a {
        position: relative;
        padding: 0 9px 0 10px;
        z-index: 2;

        &:not(:last-child) {
          margin-right: 20px;
        }

        &:hover {
          color: #e6584c;
          text-shadow: 0 0 10px #e6584c;
        }
      }

      a.active::before {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: -1;
        background-color: white;
        content: '';
        width: 100%;
        height: 50%;
      }
    }
  }
}

.hidden-nav {
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fec23b;
  z-index: 99;

  &-links {
    font-size: 4rem;

    &-items {
      display: block;
      padding: 1rem;
    }
  }
}

.slide-enter-active {
   -moz-transition-duration: 0.5s;
   -webkit-transition-duration: 0.5s;
   -o-transition-duration: 0.5s;
   transition-duration: 0.5s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.5s;
   -webkit-transition-duration: 0.5s;
   -o-transition-duration: 0.5s;
   transition-duration: 0.5s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100vh;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

@media (min-width: 768px) {
  .navbar-container {
    padding: 1rem 4rem;

    .hamburger-icon-container {
      display: none;
    }

    .links {
      display: block !important;
    }
  }
}

@media (min-width: 1024px) {
  .navbar-container {
      padding: 1rem 8rem;
  }
}

</style>
