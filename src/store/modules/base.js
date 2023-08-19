import api from "../../api"

export default {
  actions: {
    setTimer(ctx, timer) {
      return ctx.commit('setTimer', timer)
    },

    setTime(ctx, time){
      return ctx.commit('setTime', time)
    },

    setTitle(ctx, title){
      return ctx.commit('setTitle', title)
    }
  },
  mutations: {
    setTimer(state, timer) {
      state.timer = timer
      if (timer.start) {

        clearInterval(state.interval)
        state.interval = setInterval(() => {
          ++state.timer.actualSec
        }, 1000)
      }
    },

    setTime(state, actualSec){
      // now = new Date(now)

      state.timer.actualSec = actualSec
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
    title: '',
    interval: null,
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
