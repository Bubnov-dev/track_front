import api from "../../api"

export default {
  actions: {
    setTimer(ctx, timer) {
      return ctx.commit('setTimer', timer)
    },

    setNow(ctx, now){
      return ctx.commit('setTime', now)
    },

    setTitle(ctx, title){
      return ctx.commit('setTitle', title)
    }
  },
  mutations: {
    setTimer(state, timer) {
      state.timer = timer
    },

    setTime(state, now){
      state.timer.now = now
    },

    setTitle(state, title){
      state.title = title
    },

    deleteTimer(state) {
      state.timer = {}
    },
  },
  state: {
    timer: {},
    title: ''
  },
  getters: {
    getTimer(state) {
      return state.timer
    },

    getTitle(state){
      return state.title
    }
  }
}
