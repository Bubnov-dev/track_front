// import Vue from 'vue'
// import Vuex from 'vuex'
import auth from './modules/auth'
import base from './modules/base'
import { createStore } from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   modules: {
//     auth: auth
//   }
// })

export default createStore({
  modules: {
    auth: auth,
    base: base
  }
});