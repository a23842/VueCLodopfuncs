export default {
  state: {
    /**
     * 1：刷新页面， 2：刷新当前页， 其他：不刷新
     */
    refreshNav: {}
  },
  mutations: {
    setRefreshView (state, {
      name,
      val
    }) {
      state.refreshNav[name] = val
    },
    clearRefreshView (state, name) {
      state.refreshNav[name] = 0
    }
  }
}
