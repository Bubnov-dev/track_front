<template>
  <main class="center">
    <div class="center-block card">
      <div class="card__header">
        <div class="tabs">
          <div class="tabs__item active">Вход</div>
          <div class="tabs__item">Регистрация</div>
        </div>
      </div>
      <div class="card__content">
        <form action="">
          <label class="wrapper" for="email">
            <input type="text" id="email">
            <div class="placeholder">
              E-mail
            </div>
          </label>

          <label class="wrapper" for="password">
            <input type="text" id="password">
            <div class="placeholder">
              Пароль
            </div>
          </label>

          <div class="btn btn-primary">
            Вход
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'login-page'
}

</script>

<style lang="sass">
  @import "../assets/sass/login"

</style>