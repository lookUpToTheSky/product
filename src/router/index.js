import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HeadNav from '../components/HeadNav'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HeadNav,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: Home
    }]
  },{
    path: '/three',
    name: 'three',
    component: () => import('../views/three-demo/demo1.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
