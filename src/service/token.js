import api from '@/service/api.js'

export default {
  getNewToken(idToken) {
    return api.get('token-service/token/new', {
      headers: { idToken: idToken }
    })
  },

  getRefreshToken() {
    return api.get('token-service/token/refresh')
  }
}
