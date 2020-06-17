import tokenApi from '@/service/token.js'
import userApi from '@/service/user.js'
import firebase from 'firebase/app'

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
    },
    SET_AUTH_TOKEN(state, token) {
      state.user = { ...state.user, token }
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    }
  },
  actions: {
    async authenticate({ commit }, idToken) {
      await tokenApi
        .getNewToken(idToken)
        .then(res => {
          const user_token = res.data.split('.')[1]
          const auth_token = res.data
          // Decodes the base64 encoded string into a user object
          const user = atob(user_token)
          commit('SET_USER_DATA', JSON.parse(user))
          commit('SET_AUTH_TOKEN', auth_token)
          commit('SET_ERROR', null)
        })
        .catch(error => {
          // If the request fails, remove user
          commit('SET_USER_DATA', null)
          commit('SET_ERROR', error)

          throw error
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

        return token
      })
    },
    logout({ commit }) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          location.reload()
          commit('SET_USER_DATA', null)
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })
    }
  },
  getters: {
    loading: state => state.loading,

    user: state => state.user,

    error: state => state.error,

    isAuthenticated: state => !!state.user
  }
}
