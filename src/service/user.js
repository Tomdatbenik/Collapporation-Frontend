import api from '@/service/api.js'

export default {
  getProfile(userId) {
    return api.get('user-service/user/' + userId)
  }
}
