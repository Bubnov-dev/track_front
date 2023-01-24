<template>
    <div class="modal-wrapper" :class="{'open' : modelValue}">
        <div class="modal card">
            <div class="modal-close btn" @click="$emit('update:modelValue', false)">
                X
            </div>
            <slot></slot>
        </div>
    </div>

</template>

<script>

export default {
    name: 'modal-view',


    emits: ['update:modelValue'],

    props: {
        modelValue: Boolean,
    },
}

</script>

<style lang="sass">
@import "@/assets/sass/modal.sass"
</style>
