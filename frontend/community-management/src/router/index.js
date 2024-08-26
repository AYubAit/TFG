import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminHome from '../views/AdminHome.vue'
import UserHome from '../views/UserHome.vue'
import KioskView from '../views/KioskView.vue'
import getUser from '@/utils/auth'; // Importa la funció getUser des del fitxer auth.js





const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/user',
    name: 'UserHome',
    component: UserHome,
    meta: { requiresAuth: true, role: 'user' }
  },
  {
    path: '/kiosk',
    name: 'KioskView',
    component: KioskView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = getUser() // Funció que retorna l'usuari loggejat
  if (to.meta.requiresAuth) {
    if (!user) {
      next({ name: 'Login' })
    } else if (to.meta.role && to.meta.role !== user.role) {
      next({ name: 'Forbidden' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
