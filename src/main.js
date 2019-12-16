import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'
import store from './store'


import { Swipe, SwipeItem } from 'mint-ui'
import { Search } from 'mint-ui'
import { Range } from 'mint-ui'


// 处理移动端click事件300毫秒延迟
FastClick.attach(document.body)

// 懒加载安装配置
Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('./common/images/lehe.jpg'),
  error: require('./common/images/logo.png'),
  attempt: 2,
})

Vue.config.productionTip = false

// axios的全局配置
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 挂载axios
Vue.use(VueAxios,axios)

// 全局加载mint-ui组件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Search.name, Search)
Vue.component(Range.name, Range)

// console.log(store)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
