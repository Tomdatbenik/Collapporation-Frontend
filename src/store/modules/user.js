import tokenApi from '@/service/token.js'
import userApi from '@/service/user.js'

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: null,
    error: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
    },
    SET_AUTH_TOKEN(state, idToken) {
      state.user = { ...state.user, idToken }
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    }
  },
  actions: {
    authenticate({ commit }, idToken) {
      tokenApi
        .getNewToken(idToken)
        .then(res => {
          window.console.log(res)
          const token = res.data.split('.')[1]

          // Decodes the base64 encoded string into a user object
          const user = atob(token)
          localStorage.setItem('user', user)
          commit('SET_USER_DATA', JSON.parse(user))

          // Set collapporationToken in the user object so the axios interceptor
          // can check if bearer tokens needs to be added
          commit('SET_AUTH_TOKEN', token)
          localStorage.setItem('user-token', token)

          commit('SET_ERROR', null)
        })
        .catch(error => {
          // If the request fails, remove user token
          localStorage.removeItem('user-token')
          commit('SET_ERROR', error)
          console.log(error)
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    },
    getProfile({ commit }, userId) {
      commit('SET_LOADING', true)
      return userApi
        .getProfile(userId)
        .then(res => {
          return res.data
        })
        .catch(error => {
          commit('SET_ERROR', error)
          throw error
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    },
    getRefreshToken({ commit }) {
      return tokenApi.getRefreshToken().then(res => {
        const token = res.data.split('.')[1]

        console.log('received refresh token: ' + token)
        commit('SET_AUTH_TOKEN', token)
        localStorage.setItem('user-token', token)

        return token
      })
    },
    logout({ commit }) {
      localStorage.removeItem('user')
      localStorage.removeItem('user-token')
      location.reload()
      commit('SET_ERROR', null)
      commit('SET_LOADING', false)
    }
  },
  getters: {
    loading: state => state.loading,

    user: state => {
      return state.user != null
        ? state.user
        : JSON.parse(localStorage.getItem('user'))
    },

    error: state => state.error,

    isAuthenticated: state => !!state.user
  }
}
