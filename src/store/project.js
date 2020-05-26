export default {
  namespaced: true,
  state: {
    addProject: {
      title: { type: String, value: "" },
      image: { type: File },
      smallDescription: { type: String, value: "" },
      tags: { type: Array, value: [] },
      links: { type: Array, value: [] },
      description: { type: String, value: "" },
      collapporators: { type: Array, value: [] },
    },
  },
  mutations: {
    SAVE_ADDPROJECT(state, addProject) {
      state.addProject = addProject;
    },
    SAVE_PROJECT_TITLE(state, projectTitle) {
      state.addProject.title = projectTitle;
    },
    SAVE_PROJECT_IMAGE(state, projectImage) {
      state.addProject.image = projectImage;
    },
    SAVE_PROJECT_SMALLDESCRIPTION(state, projectSmallDescription) {
      state.addProject.smallDescription = projectSmallDescription;
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
    saveProjectTitle({ commit }, projectTitle) {
      commit("SAVE_PROJECT_TITLE", projectTitle);
    },
    saveProjectImage({ commit }, projectImage) {
      commit("SAVE_PROJECT_IMAGE", projectImage);
    },
    saveProjectSmallDescription({ commit }, projectSmallDescription) {
      commit("SAVE_PROJECT_SMALLDESCRIPTION", projectSmallDescription);
    },
  },
};
