import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局样式
import '../src/assets/css/global.less'
import dayjs from 'dayjs'
Vue.config.productionTip = false

Vue.filter('timeNow', () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
})
// 挂载echarts
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
