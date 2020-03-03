import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import per from './module/permission'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const createPersisted = createPersistedState({
  storage: window.sessionStorage,
  reducer (val) {
    return {
      // 只储存state中的assessmentData
      user: val.user,
      app: val.app
    }
  }
})

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    per
  },
  plugins: [createPersisted]
})
