<template>
    <label class="checkbox-wrapper">
        <input type="checkbox" @change="$emit('update:modelValue', $event.target.value)">
        <div class="fake-checkbox">
        </div>
        <div class="label">
            <slot></slot>
        </div>
    </label>
</template>

<script>
export default {
    name: 'checkbox-view',

    emits: ['update:value'],

    props: {
        value: String,
    },

}

</script>