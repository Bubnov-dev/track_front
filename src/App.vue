

<template>
  <header>

  </header>

  <RouterView />
</template>

<script >
import { mapActions } from "vuex";
import { RouterLink, RouterView } from 'vue-router'
import api from "@/api"
export default {

  methods: {
    ...mapActions(['setApiToken'])
  },

  mounted() {
    if (localStorage.getItem('token')) {
      this.setApiToken(localStorage.getItem('token'))
    }
  }
}
</script>

<style lang="sass">
  @import "assets/sass/base"
</style>
