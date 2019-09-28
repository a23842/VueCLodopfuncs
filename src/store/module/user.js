import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    token: getToken(),
    hasGetInfo: false
  },
  mutations: {
    setUserName (state, userName) {
      state.userName = userName
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    handleLogin ({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    // 退出登录
    handleLogout ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  }
}
