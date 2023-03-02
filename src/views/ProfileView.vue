<template>
    <div class="profile flex">
        <div class="profile-left">
            <div class="profile__avatar">
                <img src="src/assets/profile.svg">
            </div>
            <button class="btn btn-primary m-auto" @click="changePasswordModal=true">
                Поменять пароль
            </button>
        </div>
        <div class="profile-right">
            <form @submit.prevent="">
                <InputView placeholder="Имя" v-model="user.name" inputClass="big"
                           :error="v$.user.name.$errors.length ? v$.user.name.$errors[0].$message : ''"/>
                <InputView placeholder="E-mail" v-model="user.email" inputClass="big"
                           :error="v$.user.email.$errors.length ? v$.user.email.$errors[0].$message : ''"/>
                <div class="input flex">
                    <button class="btn btn-primary ms-auto" @click="saveChanges">
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
        <modal-component v-model="changePasswordModal">
            <form @submit.prevent="changePassword" class="form">
                <InputView placeholder="Пароль" v-model="password.password" inputClass="big" typeProp="password"
                           :error="v$.password.password.$errors.length ? v$.password.password.$errors[0].$message : ''"/>
                <InputView placeholder="Повторите пароль" v-model="password.password_confirmation" inputClass="big"
                           type="password"
                           :error="v$.password.password_confirmation.$errors.length ? v$.password.password_confirmation.$errors[0].$message : ''"/>

                <button class="btn btn-primary">Сохранить</button>
            </form>
        </modal-component>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
import InputView from "@/components/InputView.vue";
import ModalComponent from "../components/ModalComponent.vue";
import api from "../api"

import useValidate from '@vuelidate/core'
import {required, email, minLength, requiredIf, sameAs} from '@vuelidate/validators'

export default {
    name: "ProfileView",

    components: {
        ModalComponent,
        InputView,
    },

    data: function () {
        return {
            show: false,
            changes: false,

            v$: useValidate(),

            user: {
                name: '',
                email: '',
            },

            password: {
                password: '',
                password_confirmation: '',
            },

            changePasswordModal: false,
        }
    },
    validations() {
        return {
            user: {
                name: {required},
                email: {required, email},
            },
            password: {
                password: {required, minLength: minLength(8),},
                password_confirmation: {requiredIf, sameAs: sameAs(this.password.password)},
            }
        }
    },

    methods: {
        ...mapActions(['setApiToken']),

        saveChanges() {

        },
        changePassword() {

        },

    },
}
</script>

<style lang="sass">
@import '@/assets/sass/profile'
</style>