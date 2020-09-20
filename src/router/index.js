import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from '../init-firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../views/Edit.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/Add.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


/**
 * Protect route with user and password
 */
router.beforeEach((to, from, next) => {
  //Get route protected -> boolean
  const stateRoute = to.matched.some(record => record.meta.requiresAuth)
  // If exist a user authenticate -> null o user
  const userAuth = auth.currentUser
  if ( stateRoute && userAuth === null) {
    next({name:'Login'})
  }else{
    next()
  }
})

export default router
