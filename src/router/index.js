import Vue from 'vue'
import VueRouter from 'vue-router'
// import COvid2019 from '../views/Covid2019.vue'
const COvid2019 = () => import('../views/Covid2019.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: COvid2019
  }

]

const router = new VueRouter({
  routes
})

export default router
