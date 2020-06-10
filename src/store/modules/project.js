import projectApi from '@/service/project.js'

export default {
  namespaced: true,
  state: {
    feed: []
  },
  mutations: {
    SET_FEED(state, payload) {
      state.feed = payload
    }
  },
  actions: {
    getProjectFeed(context, payload) {
      return projectApi
        .getProjectFeed(payload)
        .then(res => {
          console.log(res)
          return res.data
        })
        .catch(err => {
          throw err
        })
    },
    likeProject(context, id) {
      return projectApi
        .postLike(id)
        .then(() => {
          console.log('succeeded')
        })
        .catch(err => {
          throw err
        })
    }
  },
  getters: {}
}
