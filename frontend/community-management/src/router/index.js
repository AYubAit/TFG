import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminHome from '../views/AdminHome.vue'
import UserHome from '../views/UserHome.vue'
import KioskView from '../views/KioskView.vue'
import { isAuthenticated, getUserRole } from '../utils/auth'; // Importa la funció getUser des del fitxer auth.js





const routes = [
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false }
  },
  
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    meta: { requiresAuth: true, role: 'junta' }
  },
  {
    path: '/user',
    name: 'UserHome',
    component: UserHome,
    meta: { requiresAuth: true, role: 'Soci' }
  },
  {
    path: '/kiosk',
    name: 'KioskView',
    component: KioskView,
  },{
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/Unauthorized.vue'), // Assegura't que aquesta vista existeix
  }
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 
router.beforeEach((to, from, next) => {
  // Comprova si la ruta requereix autenticació
  if (to.meta.requiresAuth) {
    if (!isAuthenticated()) {
      // Redirigeix a la pàgina de login passant la ruta original com a paràmetre query
      next({ name: 'UserLogin', query: { redirect: to.fullPath } });
    } else {


      // Si l'usuari està autenticat, comprova el rol
      if (to.meta.role != getUserRole()) {
        // Redirigeix a una altra pàgina o mostra un missatge d'error si l'usuari no té el rol correcte
        next({ name: 'Unauthorized' }); // També pots redirigir a una pàgina d'"Accés Denegat"
      } else {
        // Permet l'accés a la ruta
        next();
      }
    }
  } else {
    // Si la ruta no requereix autenticació, permet l'accés
    next();
  }
});

export default router
