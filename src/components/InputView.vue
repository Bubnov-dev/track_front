<template>

    <label class="wrapper">
        <input :type="type" placeholder=" " @input="$emit('update:modelValue', $event.target.value)">
        <div class="placeholder">
            {{ placeholder }}
        </div>
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
    },
  
    
    
    methods: {
        handleInput(e) {
            this.$emit('input', this.content)
        }
    }


}

</script>