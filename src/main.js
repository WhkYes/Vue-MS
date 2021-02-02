// 项目入口文件
import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

// 配置axios
import axios from 'axios'
// 配置请求根路径
// 个人搭建 http://127.0.0.1:8888/api/private/v1/
// 网友共享 http://timemeetyou.com:8889/api/private/v1/
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
