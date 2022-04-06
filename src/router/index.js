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
    component: () => import('../views/three-demo/effect.vue')
  },{
    path: '/earth',
    name: 'earth',
    component: () => import('../views/three-demo/earth.vue')
  },{
    path: '/girl',
    name: 'girl',
    component: () => import('../views/three-demo/girl.vue')
  },{
    path: '/shaderPass',
    name: 'shaderPass',
    component: () => import('../views/three-demo/shaderPass.vue')
  },{
    path: '/text',
    name: 'text',
    component: () => import('../views/three-demo/text.vue')
  },{
    path: '/mmd',
    name: 'mmd',
    component: () => import('../views/three-demo/mmd.vue')
  },{
    path: '/css3',
    name: 'css3',
    component: () => import('../views/three-demo/css3.vue')
  },{
    path: '/city',
    name: 'city',
    component: () => import('../views/three-demo/city.vue')
  },
  // 长沙
  {
    path: '/city-changSha',
    name: 'city-changSha',
    component: () => import('../views/three-demo/city-maptalks-three.vue')
  },
  // 上海
  {
    path: '/city-shangHai',
    name: 'city-shangHai',
    component: () => import('../views/three-demo/city-shanghai.vue')
  },
  // stores-demo
  {
    path: '/previewExcle',
    name: 'previewExcle',
    component: () => import('../views/stores-demo/previewExcle/index.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
