<template>
  <main class="center">
    <div class="center-block card">
      <div class="card__header">
        <div class="tabs">
          <div class="tabs__item" :class="{ 'active': (tab_selected == 'login') }" @click="tab_selected='login'">Вход
          </div>
          <div class="tabs__item" :class="{ 'active': (tab_selected == 'register') }"
            @click="tab_selected = 'register'">Регистрация</div>
        </div>
      </div>
      <div class="card__content">
        <form v-if="tab_selected == 'login'" action="">

          <InputView placeholder="E-mail" v-model="user.email" />
          <InputView placeholder="Пароль" v-model="user.password" />

          <div class="btn btn-primary" @click="login">
            Вход
          </div>
        </form>

        <form v-if="tab_selected == 'register'" action="">
          <InputView placeholder="Имя" v-model="reg_user.name" />
          <InputView placeholder="E-mail" v-model="reg_user.email" />
          <InputView placeholder="Пароль" v-model="reg_user.password" />
          <InputView placeholder="Повторите пароль" v-model="reg_user.password_confirmation" />


          <div class="btn btn-primary" @click="register">
            Регистрация
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
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
    ...mapActions(['setApiToken']),
    login() {
      api.user.login(this.user).then( (msg) => {
        console.log(msg)
        this.setApiToken(msg.data.token)
      }).catch(function (msg) {
        console.log(msg)
      })
    },
    register() {
      api.user.register(this.reg_user).then(function (msg) {
        console.log(msg)
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