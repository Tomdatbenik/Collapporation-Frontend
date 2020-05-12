import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: null,
    loading: null,
    error: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      // axios.defaults.headers.common['collapporationToken'] =
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    }
  },
  actions: {
    authenticate({ commit }, credential) {
      commit('SET_LOADING', true)
      axios
        .get('http://localhost:8102/token-service/token/new', {
          headers: { idToken: credential }
        })
        .then(response => {
          console.log(response)
          commit('SET_USER_DATA', response.data)
          commit('SET_ERROR', null)
          commit('SET_LOADING', false)
        })
        .catch(error => {
          console.log(error)
          commit('SET_ERROR', error)
          commit('SET_LOADING', false)
        })
    }
  },
  getters: {
    loading: state => {
      return state.loading
    },

    user: state => {
      return state.user != null
        ? state.user
        : JSON.parse(localStorage.getItem('user'))
    },

    error: state => {
      return state.error
    },

    loggedIn: state => {
      return !!state.user
    }
  }
}
