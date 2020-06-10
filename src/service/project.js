import api from '@/service/api.js'

export default {
  postLike(id) {
    return api.post('like-service/like/like', { object_id: id })
  },
  getProjectFeed(payload) {
    return api.get('project-service/projectfeed/all', {
      params: {
        page: payload.page,
        size: payload.size
      }
    })
  }
}
