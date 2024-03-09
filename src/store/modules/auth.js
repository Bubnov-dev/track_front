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
    },
    setUserId(ctx, id){
      localStorage.setItem('userId', id)
      return ctx.commit('setUserId', id)
    }
  },
  mutations: {
    setApiToken(state, token) {
      state.token = token

    },
    setUserName(state, name){
      state.user.name = name
    },

    setUserId(state, id){
      state.user.id = id
    },

    deleteApiToken(state) {
      state.token = ""
    },
  },
  state: {
    token: "",
    user:{
      name: '',
      id: '',
    },

  },
  getters: {
    getApiToken(state) {
      return state.token
    },
    getUser(state){
      return state.user
    },
    getUserId(state){
      return state.user.id
    }
  }
}
