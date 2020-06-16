import projectApi from '@/service/project'

export default {
  namespaced: true,
  state: {
    feed: [],
    addProject: {
      title: '',
      img: '',
      smallDescription: '',
      tags: '',
      links: '',
      description: '',
      collapporators: ''
    }
  },
  mutations: {
    SET_FEED(state, payload) {
      state.feed = payload
    },
    SAVE_ADDPROJECT(state, addProject) {
      state.addProject = addProject
    },
    SAVE_PROJECT_TITLE(state, title) {
      state.addProject.title = title
    },
    SAVE_PROJECT_IMAGE(state, image) {
      state.addProject.img = image
    },
    SAVE_IMAGE(state, image) {
      state.image = image
    },
    SAVE_PROJECT_SMALLDESCRIPTION(state, smallDescription) {
      state.addProject.smallDescription = smallDescription
    },
    SAVE_PROJECT_TAGS(state, tags) {
      state.addProject.tags = tags
      state.addProject.tags = ''
    },
    SAVE_PROJECT_LINKS(state, links) {
      state.addProject.links = links
      state.addProject.links = ''
    },
    SAVE_PROJECT_DESCRIPTION(state, description) {
      state.addProject.description = description
    },
    SAVE_PROJECT_COLLAPPORATORS(state, collapporators) {
      state.addProject.collapporators = collapporators
      state.addProject.collapporators = ''
    }
  },
  getters: {
    getAddProject: state => {
      return state.addProject
    }
  },
  actions: {
    getProjectFeed(context, payload) {
      return projectApi
        .getProjectFeed(payload)
        .then(res => {
          return res.data
        })
        .catch(err => {
          throw err
        })
    },
    getProjectById(context, id) {
      return projectApi
        .getProjectById(id)
        .then(res => {
          console.log(res.data)
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
    },
    updateProject(context, data) {
      return projectApi
        .updateProject(data)
        .then(response => {
          return response
        })
        .cath(error => {
          throw error
        })
    },
    saveAddProject({ commit }, addProject) {
      if (!addProject) {
        addProject = {
          title: '',
          img: '',
          smallDescription: '',
          tags: '',
          links: '',
          description: '',
          collapporators: ''
        }
      }
      commit('SAVE_ADDPROJECT', addProject)
    },
    saveProjectTitle({ commit }, title) {
      commit('SAVE_PROJECT_TITLE', title)
    },
    async saveProjectImage({ commit }, image) {
      if (image) {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = () => {
          commit('SAVE_PROJECT_IMAGE', reader.result)
        }
        reader.onerror = error => {
          console.log('Error: ', error)
        }
      } else {
        commit('SAVE_PROJECT_IMAGE', '')
      }
    },
    saveProjectSmallDescription({ commit }, smallDescription) {
      commit('SAVE_PROJECT_SMALLDESCRIPTION', smallDescription)
    },
    saveProjectTags({ commit }, tags) {
      commit('SAVE_PROJECT_TAGS', tags)
    },
    saveProjectLinks({ commit }, links) {
      commit('SAVE_PROJECT_LINKS', links)
    },
    saveProjectDescription({ commit }, description) {
      commit('SAVE_PROJECT_DESCRIPTION', description)
    },
    saveProjectCollapporators({ commit }, collapporators) {
      commit('SAVE_PROJECT_COLLAPPORATORS', collapporators)
    }
  }
}
