<template>
  <label class="wrapper">
    <input :type="type" placeholder=" " :value="$attrs.modelValue"
           @input="$emit('update:modelValue', $event.target.value)" :class="inputClass">
    <div class="placeholder">
      {{ placeholder }}
    </div>
    <div v-if="typeProp=='password'" class="input__append">
      <div @click="showPassword">
        <svg v-if="!show" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
             focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityRoundedIcon">
          <path
            d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
        </svg>
        <svg v-else class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false"
             aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityOffRoundedIcon">
          <path
            d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z"></path>
        </svg>
      </div>
    </div>
    <!--    <slot></slot>-->
    <transition name="bounce">
      <div class="hint hint--error" v-if="error">{{ error }}</div>
    </transition>
  </label>
</template>

<script>
export default {
  name: 'input-view',

  emits: ['update:value'],

  props: {
    value: String,
    placeholder: String,
    typeProp: {
      type: String,
      default: 'text'
    },
    error: String,
    inputClass: String,
  },

  data: function () {
    return {
      show: true,
      type: '',
    }
  },

  mounted() {
    this.type = this.typeProp
    if (this.type == 'password') {
      this.show = false
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', this.content)
    },
    showPassword() {
      this.show = !this.show
      if (this.show) {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }


}

</script>