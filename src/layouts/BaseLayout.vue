<template>
    <div class="base-layout">
        <div class="base-layout__menu main-menu">
            <div class="main-menu">

                <div class="main-menu__item" :class="{'open' : menu.projects}">
                    <div class="main-menu__title">
                        Проекты

                        <button class="main-menu__btn" @click="menu.projects = !menu.projects">
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M15.5506 0.949452C16.0387 1.43761 16.0387 2.22906 15.5506 2.71722L8.88392 9.38389C8.39577 9.87204 7.60431 9.87204 7.11616 9.38389L0.449491 2.71722C-0.0386648 2.22906 -0.0386648 1.43761 0.44949 0.949453C0.937646 0.461298 1.7291 0.461298 2.21726 0.949453L8.00004 6.73224L13.7828 0.949452C14.271 0.461297 15.0624 0.461297 15.5506 0.949452Z"
                                    fill="#FFF1DE" />
                            </svg>

                        </button>

                    </div>
                    <div class="main-menu__childs">
                        <div class="main-menu__child">
                            проект 1
                        </div>
                        <div class="main-menu__child">
                            проект 2
                        </div>
                    </div>


                </div>

                <div class="main-menu__item" :class="{'open' : menu.projects2}">
                    <div class="main-menu__title">
                        Проекты

                        <button class="main-menu__btn" @click="menu.projects2 = !menu.projects2">
                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M15.5506 0.949452C16.0387 1.43761 16.0387 2.22906 15.5506 2.71722L8.88392 9.38389C8.39577 9.87204 7.60431 9.87204 7.11616 9.38389L0.449491 2.71722C-0.0386648 2.22906 -0.0386648 1.43761 0.44949 0.949453C0.937646 0.461298 1.7291 0.461298 2.21726 0.949453L8.00004 6.73224L13.7828 0.949452C14.271 0.461297 15.0624 0.461297 15.5506 0.949452Z"
                                    fill="#FFF1DE" />
                            </svg>

                        </button>

                    </div>
                    <div class="main-menu__childs">
                        <div class="main-menu__child">
                            проект 1
                        </div>
                        <div class="main-menu__child">
                            проект 2
                        </div>
                    </div>


                </div>
            </div>

        </div>

        <div class="base-layout__content">
            <h2>Title</h2>

            <RouterView />

        </div>


    </div>
</template>

<script>

import { RouterLink, RouterView } from 'vue-router'


export default {
    data: function () {
        return {
            menu: {
                projects: false,
                projects2: false,
            }
        }  
    },


}

</script>

<style lang="sass">
@import '@/assets/sass/base-layout'
</style>