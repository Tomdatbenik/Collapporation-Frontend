export default {
  namespaced: true,
  state: {
    addProject: {
      title: "",
      image: null,
      smallDescription: "",
      tags: [],
      links: [],
      description: "",
      collapporators: [],
    },
  },
  mutations: {
    SAVE_ADDPROJECT(state, addProject) {
      state.addProject = addProject;
    },
    SAVE_PROJECT_TITLE(state, title) {
      state.addProject.title = title;
    },
    SAVE_PROJECT_IMAGE(state, image) {
      state.addProject.image = image;
    },
    SAVE_PROJECT_SMALLDESCRIPTION(state, smallDescription) {
      state.addProject.smallDescription = smallDescription;
    },
    SAVE_PROJECT_TAGS(state, tags) {
      state.addProject.tags = tags;
    },
    SAVE_PROJECT_LINKS(state, links) {
      state.addProject.links = links;
    },
    SAVE_PROJECT_DESCRIPTION(state, description) {
      state.addProject.description = description;
    },
    SAVE_PROJECT_COLLAPPORATORS(state, collapporators) {
      state.addProject.collapporators = collapporators;
    },
  },
  getters: {
    getAddProject: (state) => {
      return state.addProject;
    },
  },
  actions: {
    saveAddProject({ commit }, addProject) {
      commit("SAVE_ADDPROJECT", addProject);
    },
    saveProjectTitle({ commit }, title) {
      commit("SAVE_PROJECT_TITLE", title);
    },
    saveProjectImage({ commit }, image) {
      commit("SAVE_PROJECT_IMAGE", image);
    },
    saveProjectSmallDescription({ commit }, smallDescription) {
      commit("SAVE_PROJECT_SMALLDESCRIPTION", smallDescription);
    },
    saveProjectTags({ commit }, tags) {
      commit("SAVE_PROJECT_TAGS", tags);
    },
    saveProjectLinks({ commit }, links) {
      commit("SAVE_PROJECT_LINKS", links);
    },
    saveProjectDescription({ commit }, description) {
      commit("SAVE_PROJECT_DESCRIPTION", description);
    },
    saveProjectCollapporators({ commit }, collapporators) {
      commit("SAVE_PROJECT_COLLAPPORATORS", collapporators);
    },
  },
};
