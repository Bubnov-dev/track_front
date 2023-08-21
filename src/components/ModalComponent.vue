<template>
    <div class="modal-wrapper" :class="{'open' : modelValue}" @click="$emit('update:modelValue', false)">
        <div class="modal" @click.stop="">
            <h2 v-if="title" class="mt-0">{{ title }}</h2>
            <div class="modal__close btn" @click="$emit('update:modelValue', false)">
                <svg width="15" height="15" viewBox="0 0 162 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M158.7 146.3C160.202 147.817 161.045 149.865 161.045 152C161.045 154.135 160.202 156.183 158.7 157.7C157.171 159.178 155.127 160.005 153 160.005C150.873 160.005 148.829 159.178 147.3 157.7L81.0001 91.2999L14.7001 157.7C13.171 159.178 11.1271 160.005 9.00008 160.005C6.87303 160.005 4.8292 159.178 3.30008 157.7C1.79783 156.183 0.955078 154.135 0.955078 152C0.955078 149.865 1.79783 147.817 3.30008 146.3L69.7001 79.9999L3.30008 13.6999C2.02438 12.1456 1.37244 10.1723 1.47108 8.16385C1.56972 6.15543 2.41189 4.2555 3.83376 2.83362C5.25564 1.41174 7.15557 0.569581 9.16399 0.47094C11.1724 0.3723 13.1457 1.02423 14.7001 2.29994L81.0001 68.6999L147.3 2.29994C148.854 1.02423 150.828 0.3723 152.836 0.47094C154.845 0.569581 156.745 1.41174 158.166 2.83362C159.588 4.2555 160.43 6.15543 160.529 8.16385C160.628 10.1723 159.976 12.1456 158.7 13.6999L92.3001 79.9999L158.7 146.3Z"
                        fill="black"/>
                </svg>

            </div>
            <div class="modal__content">
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'modal-component',


    emits: ['update:modelValue'],

    props: {
        modelValue: Boolean,
        title: String
    },
}

</script>

<style lang="sass">
@import "@/assets/sass/modal.sass"
</style>
