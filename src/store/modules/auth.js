import api from "../../api"

export default {
  actions: {

    setApiToken(ctx, token) {
      localStorage.setItem('token', token)
      api.setApiToken(token)
      return ctx.commit('setApiToken', token)
    },
    setUser(ctx, name){
      return ctx.commit('setUserName', name)
    }
  },
  mutations: {
    setApiToken(state, token) {
      state.token = token

    },
    setUserName(state, name){
      state.user.name = name
    },

    deleteApiToken(state) {
      state.token = ""
    },
  },
  state: {
    token: "",
    user:{
      name: ''
    }
  },
  getters: {
    getApiToken(state) {
      return state.token
    },
    getUser(state){
      return state.user
    }
  }
}
