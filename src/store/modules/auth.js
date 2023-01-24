import api from "../../api"

export default {
  actions: {

    setApiToken(ctx, token) {
      localStorage.setItem('token', token)
      api.setApiToken(token)
      return ctx.commit('setApiToken', token)
    }
  },
  mutations: {
    setApiToken(state, token) {
      state.token = token

    },

    deleteApiToken(state) {
      state.token = ""
    },
  },
  state: {
    token: ""
  },
  getters: {
    getApiToken(state) {
      return state.token
    },
  }
}
