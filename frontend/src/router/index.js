import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/home',
      alias: '/',
      name: 'Home',
      component: () => import('../components/Home.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register.vue'),
      meta: {
        requiresGuest: true,
        hideNavigation: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login.vue'),
      meta: {
        requiresGuest: true,
        hideNavigation: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../components/Admin.vue'),
      meta: {
        requiresAuth: true,
        hideNavigation: true
      }
    },
    {
      path: '/shop',
      name: 'Shop',
      component: () => import('../components/Shop.vue')
    },
    {
      path: '/view-item/:id',
      name: 'View Item',
      component: () => import('../components/ViewItem.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../components/Cart.vue')
    },
    {
      path: '/thank-you',
      name: 'Thank You',
      component: () => import('../components/ThankYou.vue')
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: () => import('../components/Forgot.vue'),
      meta: {
        requiresGuest: true,
        hideNavigation: true
      }
    },
    {
      path: '/reset/:token',
      name: 'Reset',
      component: () => import('../components/Reset.vue'),
      meta: {
        requiresGuest: true,
        hideNavigation: true
      }
    },
    // No route here, get lost bozo
    {
      path: '*',
      name: '404',
      component: () => import('../components/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to Login page
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      // Redirect to Login page
      next('/admin')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
