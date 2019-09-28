// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import { sync } from 'vuex-router-sync'
import router from './router'
import iView from 'iview'
import config from '@/config'
import mixin from './mixin'
import importDirective from '@/directive'
import importFilters from '@/filter'
import filters from '@/filter/filters'
import VueLazyLoad from 'vue-lazyload'
import 'iview/dist/styles/iview.css'
import './assets/font/iconfont.css'
import errorImg from './assets/images/default.jpg'
import loadingImg from './assets/images/loading.gif'
// import TreeTable from 'tree-table-vue'

Vue.config.productionTip = false
sync(store, router)
Vue.use(iView)
Vue.mixin(mixin)
// Vue.use(TreeTable)
importDirective(Vue)
importFilters(Vue)
Vue.prototype.$config = config

Vue.use(VueLazyLoad, {
  lazyComponent: true,
  preLoad: 1.3,
  attempt: 1,
  error: errorImg,
  loading: loadingImg,
  filter: {
    format (listener, options) {
      listener.src = filters.image(listener.src)
    }
  }
})

/* eslint-disable no-new */

// ie10及以下不支持dataset导致的，而iView的transfer-dom.js使用了该属性
if (window.HTMLElement) {
  if (Object.getOwnPropertyNames(HTMLElement.prototype).indexOf('dataset') === -1) {
    Object.defineProperty(HTMLElement.prototype, 'dataset', {
      get: function () {
        let attributes = this.attributes
        let name = []
        let value = []
        let obj = {}
        for (let i in attributes) {
          if (attributes[i].nodeName.slice(0, 5)) {
            name.push(attributes[i].nodeName.slice(5))
            value.push(attributes[i].nodeValue)
          }
        }
        for (let j in name) {
          obj[name[j]] = value[j]
        }
        return obj
      }
    })
  }
}

// 兼容requestAnimationFrame（ie9）
// (function () {
//   let lastTime = 0
//   let vendors = ['ms', 'moz', 'webkit', 'o']
//   for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//     window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
//     window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
//   }
//   if (!window.requestAnimationFrame) {
//     window.requestAnimationFrame = function (callback, element) {
//       let currTime = new Date().getTime()
//       let timeToCall = Math.max(0, 16 - (currTime - lastTime))
//       let id = window.setTimeout(function () {
//         callback(currTime + timeToCall)
//       }, timeToCall)
//       lastTime = currTime + timeToCall
//       return id
//     }
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
