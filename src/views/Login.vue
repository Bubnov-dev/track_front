<template>
    <main class="center">
        <div class="center-block card">
            <div class="card__header">
                <div class="tabs">
                    <div class="tabs__item" :class="{ 'active': (tab_selected == 'login') }"
                         @click="tab_selected='login'">Вход
                    </div>
                    <div class="tabs__item" :class="{ 'active': (tab_selected == 'register') }"
                         @click="tab_selected = 'register'">Регистрация
                    </div>
                </div>
            </div>
            <div class="card__content">
                <form v-if="tab_selected == 'login'" @submit.prevent="login">

                    <InputView placeholder="E-mail" v-model="user.email" inputClass="big"/>
                    <InputView placeholder="Пароль" v-model="user.password"  inputClass="big"/>

                    <button class="btn btn-primary" >
                        Вход
                    </button>
                </form>

                <form v-if="tab_selected == 'register'" @submit.prevent="register">
                    <InputView placeholder="Имя" v-model="reg_user.name" inputClass="big"/>
                    <InputView placeholder="E-mail" v-model="reg_user.email" inputClass="big"/>
                    <InputView placeholder="Пароль" v-model="reg_user.password" inputClass="big"/>
                    <InputView placeholder="Повторите пароль" v-model="reg_user.password_confirmation" inputClass="big"/>


                    <button class="btn btn-primary" >
                        Регистрация
                    </button>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import InputView from "@/components/InputView.vue";
import api from "../api"

export default {
    name: 'login-page',

    components: {
        InputView
    },

    data: function () {
        return {
            tab_selected: 'login',

            user: {
                email: '',
                password: '',
            },

            reg_user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },

    methods: {
        ...mapActions(['setApiToken', "setUser"]),
        login() {
            api.user.login(this.user).then((msg) => {
                console.log(msg)
                this.setApiToken(msg.data.token)
                this.setUser(msg.data.user.name)
                this.$router.push({name: 'projects'})
            }).catch(function (msg) {
                console.log(msg)
            })
        },
        register() {
            api.user.register(this.reg_user).then( (msg) => {
                console.log(msg)

                this.setApiToken(msg.data.token)
                this.setUser(msg.data.user.name)
                this.$router.push({name: 'projects'})
            }).catch(function (msg) {
                console.log(msg)
            })
        }
    }
}


</script>

<style lang="sass">
@import "../assets/sass/login"

</style>
