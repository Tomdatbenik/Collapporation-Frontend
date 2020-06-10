import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user.js'
import project from '@/store/modules/project.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    project
  }
})
