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
        ...mapActions(['setApiToken', 'setTimer', 'setTime', 'setUser', 'setUserId'])
    },

    mounted() {

        document.addEventListener('click', function (e) {

            document.querySelectorAll('.tooltip-menu').forEach(el => {
                el.classList.remove('open')
            })

            if (e.target.classList.contains('tooltip-btn')) {
                if (
                    e.target.parentNode.querySelectorAll('.tooltip-menu')[0]
                ) {
                    e.target.parentNode.querySelectorAll('.tooltip-menu')[0].classList.add('open')
                }
            }
        });

        if (localStorage.getItem('token')) {
            this.setApiToken(localStorage.getItem('token'))
            api.getTimer().then(response => {
                this.setTimer(response.data)


            }).catch((error) => {
              if (error.response && error.response.status === 401) {
                this.$router.push('/login')
              }
            });
        } else {
            this.$router.push('/login')
        }

        api.user.me().then(response => {
          this.setUser(response.data.name)
          console.log(response.data.id)
          this.setUserId(response.data.id)
        })

    },

    computed: {
        ...mapGetters({
            timer: 'getTimer'
        })
    }
}
</script>

<style lang="scss">
@import "assets/sass/bootstrap";
</style>
<style lang="sass">
@import "assets/sass/base"
</style>
