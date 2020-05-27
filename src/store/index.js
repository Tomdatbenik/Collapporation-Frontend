import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//modules
import project from '@/store/modules/project.js'
import user from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user,
    project
  }
})
