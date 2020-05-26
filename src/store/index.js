import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

//modules
import projectModule from "./projectModule";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    projectModule: projectModule,
  },
});
