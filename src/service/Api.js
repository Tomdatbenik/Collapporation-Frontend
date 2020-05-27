import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8102/',
  withCredentials: false
})

export default {
  getNewToken(idToken) {
    return api.get('token-service/token/new', {
      headers: { idToken: idToken }
    })
  },

  getRefreshedToken(collapToken) {
    return api.get('token-service/token/refresh', {
      headers: { collaporationToken: collapToken }
    })
  },

  getProfile(userId) {
    return api.get('user-service/user/' + userId)
  }
}
