/*eslint quote-props: ["error", "as-needed"]*/
import axios from 'axios'

export default {
  state: {
    User: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      // axios.defaults.headers.common['collapporationToken'] =
    }
  },
  actions: {
    authenticate({ commit }, credential) {
      axios
        .get('http://localhost:8102/token-service/token/new', null, {
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
