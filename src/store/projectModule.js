export default {
  state: {
    addProject: {
      title: "",
      image: undefined,
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
  },
  getters: {
    getAddProject: (state) => {
      return state.addProject;
    },
  },
  actions: {
    SaveAddProject({ commit }, addProject) {
      commit("SAVE_ADDPROJECT", addProject);
    },
  },
};
