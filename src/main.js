import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import 'animate.css';
import SWIcon from '@/components/icon'

Vue.use(ElementUI)
Vue.use(SWIcon)

Vue.config.productionTip = false
// if (process.env.NODE_ENV === 'development') {
//   const { runMock } = require('../mock')
//   runMock()
// }

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')