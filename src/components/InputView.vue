<template>
    <label class="wrapper">
        <input :type="type" placeholder=" " @input="$emit('update:modelValue', $event.target.value)" :class="inputClass">
        <div class="placeholder">
            {{ placeholder }}
        </div>
        <transition name="bounce">
            <div class="tooltip tooltip--error" v-if="error">{{ error }}</div>
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
        type: {
            type: String,
            default: 'text'
        },
        error: String,
        inputClass: String,
    },

    methods: {
        handleInput(e) {
            this.$emit('input', this.content)
        }
    }


}

</script>