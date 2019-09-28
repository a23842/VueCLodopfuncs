import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import store from '@/store'
import { setToken, getToken } from '@/libs/util'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'hash'
})

const LOGIN_PAGE_NAME = 'login'
const REGISTER_PAGE_NAME = 'register'

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (to.name === REGISTER_PAGE_NAME) {
    next()
  } else if (to.name === LOGIN_PAGE_NAME) {
    next()
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME
    })
  } else {
    if (store.state.user.hasGetInfo) {
      if (to.params.refreshView) {
        store.commit('setRefreshView', {name: to.name, val: to.params.refreshView})
      }
      next()
    } else {
      store.dispatch('getUserInfo').then(user => {
        next()
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
  next()
  // 正式环境将下一行去除掉！！！！
  setToken(1111)
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
