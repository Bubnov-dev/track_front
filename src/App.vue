

<template>
  <header>

  </header>

  <RouterView />
</template>

<script >
import { RouterLink, RouterView } from 'vue-router'
import api from "@/api"
export default {
  
  mounted(){
    api.project.get(9).then(function(msg){
      console.log(msg)
    })
  }
}
</script>

<style lang="sass">
  @import "assets/sass/base"
</style>