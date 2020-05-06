import axios from 'axios'

export default {
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData.data
      localStorage.setItem('user', JSON.stringify(userData.data))
      // axios.defaults.headers.common['collapporationToken'] =
    }
  },
  actions: {
    authenticate({ commit }, credential) {
      axios
        .get('http://localhost:8102/token-service/token/new', {
          headers: { idToken: credential }
        })
        .then(data => {
          console.log(data)
          commit('SET_USER_DATA', data)
        })
    }
  },
  getters: {
    isPlaying: state => {
      return state.isCurrentlyPlaying
    }
  }
}
