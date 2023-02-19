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
        ...mapActions(['setApiToken', 'setTimer', 'setNow', 'setUser'])
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
            }).catch(() => {
                useToast().error('Ошибка')
            });

            setInterval(() => {
                this.setNow(++this.timer.now)
            }, 1000)

            api.user.me().then(response => {
                this.setUser(response.data.name)
            })
        } else {
            this.$router.push('/login')
        }


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
