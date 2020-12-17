import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/login",
    name:'login',
    component: ()=> import('../views/login.vue')
  },
  {
    path:"/register",
    name:'register',
    component: ()=> import('../views/register.vue')
  },
  {
    path:"/add-product",
    name:'add-product',
    component: ()=> import('../views/add-product.vue'),
    meta:{requiresAuth:true}
  },
  {
    path:"/view-products",
    name:'view-products',
    component: ()=> import('../views/view-products.vue'),
    meta:{requiresAuth:true}
  },
  {
    path:"/view-public",
    name:'view-public',
    component: ()=> import('../views/view-public.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
