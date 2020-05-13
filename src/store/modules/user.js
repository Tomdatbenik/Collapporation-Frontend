import axios from 'axios'
import API from '@/service/Api.js'

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
      axios.defaults.headers.common['collapporationToken'] = userData
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
      API.getNewToken(credential)
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
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
      commit('SET_ERROR', null)
      commit('SET_LOADING', false)
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
