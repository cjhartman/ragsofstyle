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
      name: 'home',
      component: () => import('../components/Home.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue'),
      meta: {
        requiresGuest: true,
        hideNavigation: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue'),
      meta: {
        requiresGuest: true,
        hideNavigation: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/Admin.vue'),
      meta: {
        requiresAuth: true,
        hideNavigation: true
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../components/Shop.vue')
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
