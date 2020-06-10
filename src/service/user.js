import api from '@/service/api.js'

export default {
  getProfile(userId) {
    return api.get('user-service/user/' + userId)
  },
  sendLike(authToken, id) {
    console.log(authToken)
    return api.post(
      'like-service/like/like',
      { object_id: id },
      {
        headers: { Authorization: 'Bearer ' + authToken.replace('"', '') }
      }
    )
  }
}
