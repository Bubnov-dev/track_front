<template>
    <header>

    </header>

    <RouterView/>
</template>

<style lang="scss">
@import "vue-toastification/src/scss/_variables";
@import "vue-toastification/src/scss/_toastContainer";
@import "vue-toastification/src/scss/_toast";
@import "vue-toastification/src/scss/_closeButton";
@import "vue-toastification/src/scss/_progressBar";
@import "vue-toastification/src/scss/_icon";
@import "vue-toastification/src/scss/animations/_bounce";
</style>
<script>
import {mapActions, mapGetters} from "vuex";
import {RouterLink, RouterView} from 'vue-router'
import api from "@/api"
import {useToast} from "vue-toastification";

export default {

    methods: {
        ...mapActions(['setApiToken', 'setTimer', 'setNow'])
    },

    mounted() {
        if (localStorage.getItem('token')) {
            this.setApiToken(localStorage.getItem('token'))
        } else {
            this.$router.push('/login')
        }
        api.getTimer().then(response=>{
            this.setTimer(response.data)
        }).catch(
            useToast().error('Ошибка')
        );

        setInterval(()=>{
            this.setNow(++this.timer.now)
        }, 1000)

    },

    computed:{
        ...mapGetters({
            timer: 'getTimer'
        })
    }
}
</script>

<style lang="sass">
@import "assets/sass/base"
</style>
