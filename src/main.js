import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css'

import qs from 'qs'
Vue.prototype.qs = qs

//引入axios模块
import axios from 'axios'
import VueAxiox from 'vue-axios'

//引入elementui模块
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

//挂载axios到vue实例上
Vue.prototype.axios = axios


//注册模块
Vue.use(ElementUI);
Vue.use(axios,VueAxiox);

//设置axios的基本配置
axios.defaults.baseURL = 'http://120.77.175.7:8080'
//axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
