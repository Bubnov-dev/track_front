<template>
  <main class="center">
    <div class="center-block card">
      <div class="card__header">
        <div class="tabs">
          <div class="tabs__item" :class="{ 'active': (tab_selected == 'login') }" @click="tab_selected='login'">Вход
          </div>
          <div class="tabs__item" :class="{ 'active': (tab_selected == 'register') }"
               @click="tab_selected = 'register'">Регистрация
          </div>
        </div>
      </div>
      <div class="card__content">
        <form v-if="tab_selected == 'login'" action="" @submit.prevent="">

          <InputView placeholder="E-mail" v-model="user.email" inputClass="big"
                     :error="v$.user.email.$errors.length ? v$.user.email.$errors[0].$message : ''"/>
          <InputView placeholder="Пароль" v-model="user.password" inputClass="big" typeProp="password"
                     :error="v$.user.password.$errors.length ? v$.user.password.$errors[0].$message : ''"/>
          <button class="btn btn-primary" @click="login">
            Вход <spinner-component :show="loading.auth"/>
          </button>
        </form>

        <form v-if="tab_selected == 'register'" action="" @submit.prevent="">
          <InputView placeholder="Имя" v-model="reg_user.name" inputClass="big"
                     :error="v$.reg_user.name.$errors.length ? v$.reg_user.name.$errors[0].$message : ''"/>
          <InputView placeholder="E-mail" v-model="reg_user.email" inputClass="big"
                     :error="v$.reg_user.email.$errors.length ? v$.reg_user.email.$errors[0].$message : ''"/>
          <InputView placeholder="Пароль" v-model="reg_user.password" inputClass="big" typeProp="password"
                     :error="v$.reg_user.password.$errors.length ? v$.reg_user.password.$errors[0].$message : ''"/>
          <InputView placeholder="Повторите пароль" v-model="reg_user.password_confirmation" inputClass="big"
                     type="password"
                     :error="v$.reg_user.password_confirmation.$errors.length ? v$.reg_user.password_confirmation.$errors[0].$message : ''"/>

          <button class="btn btn-primary" @click="register">
            Регистрация  <spinner-component :show="loading.auth"/>
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

import useValidate from '@vuelidate/core'
import {required, email, minLength, requiredIf, sameAs} from '@vuelidate/validators'
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import {useToast} from "vue-toastification";

export default {
  name: 'login-page',

  components: {
    SpinnerComponent,
    InputView,
  },

  data: function () {
    return {
      tab_selected: 'login',
      show: false,

      v$: useValidate(),

      user: {
        email: '',
        password: '',
      },

      reg_user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },

      loading: {
        auth: false
      }
    }
  },
  validations() {
    return {
      user: {
        email: {required, email},
        password: {required},
      },
      reg_user: {
        name: {required},
        email: {required, email},
        password: {required, minLength: minLength(8),},
        password_confirmation: {requiredIf, sameAs: sameAs(this.reg_user.password)},
      }
    }
  },

  methods: {
    ...mapActions(['setApiToken']),
    login() {
      this.v$.user.$validate() // checks all inputs
      if (!this.v$.user.$errors.length) {
        this.loading.auth = true

        api.user.login(this.user).then((msg) => {
          console.log(msg)
          this.setApiToken(msg.data.token)
          this.$router.push({name: 'projects'})
        }).catch(function (msg) {

          if (msg.response.status == 403){
            useToast().error('Неправильный логин или пароль')
          } else{
            useToast().error('Произошла непредвиденная ошибка')
          }
          console.log(msg)
        }).finally(()=>{
          this.loading.auth = false
        })
      } else {
        //fail validation
        console.log(this.v$.errors)
      }

    },
    register() {
      this.v$.reg_user.$validate() // checks all inputs
      if (!this.v$.reg_user.$errors.length) {
        this.loading.auth = true

        api.user.register(this.reg_user).then( (msg) => {
          console.log(msg)
          this.$router.push({name: 'projects'})
        }).catch( (msg) => {
          useToast().error('Произошла непредвиденная ошибка')
          console.log(msg)
        }).finally(()=>{
          this.loading.auth = false
        })
      }
    }
  }
}


</script>

<style lang="sass">
@import "../assets/sass/login"

</style>