import { mapState, mapMutations } from 'vuex'
const mixin = {
  computed: {
    ...mapState({
      userData: state => state.user,
      refreshNav: state => state.app.refreshNav
    })
  },
  methods: {
    ...mapMutations([
      'setRefreshView',
      'clearRefreshView'
    ])
  }
}

export default mixin
