<script setup>
import service from "@/service";
</script>

<template>
    <div class="base-layout">
        <div class="base-layout__menu">
            <div class="main-menu">
                <router-link to="/" class="main-menu__logo">
                    <h1>
                        L O G O
                    </h1>
                    <!--                     <img src="@/assets/logo.png" alt="">-->
                </router-link>

                <div class="main-menu__item" v-for="project in projectList" :key="project.id">
                    <div class="main-menu__title">
                        <router-link :to="{name: 'project', params: { id: project.id}}">{{ project.name }}</router-link>
                    </div>
                </div>

                <!--                <div class="main-menu__item" :class="{'open' : menu.projects2}">-->
                <!--                    <div class="main-menu__title">-->
                <!--                        Проекты-->

                <!--                        <button class="main-menu__btn" @click="menu.projects2 = !menu.projects2">-->
                <!--                            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"-->
                <!--                                 xmlns="http://www.w3.org/2000/svg">-->
                <!--                                <path fill-rule="evenodd" clip-rule="evenodd"-->
                <!--                                      d="M15.5506 0.949452C16.0387 1.43761 16.0387 2.22906 15.5506 2.71722L8.88392 9.38389C8.39577 9.87204 7.60431 9.87204 7.11616 9.38389L0.449491 2.71722C-0.0386648 2.22906 -0.0386648 1.43761 0.44949 0.949453C0.937646 0.461298 1.7291 0.461298 2.21726 0.949453L8.00004 6.73224L13.7828 0.949452C14.271 0.461297 15.0624 0.461297 15.5506 0.949452Z"-->
                <!--                                      fill="#000"/>-->
                <!--                            </svg>-->

                <!--                        </button>-->

                <!--                    </div>-->
                <!--                    <div class="main-menu__childs">-->
                <!--                        <div class="main-menu__child">-->
                <!--                            проект 1-->
                <!--                        </div>-->
                <!--                        <div class="main-menu__child">-->
                <!--                            проект 2-->
                <!--                        </div>-->
                <!--                    </div>-->


                <!--                </div>-->
            </div>

        </div>
        <div>

            <div class="base-layout__header">

                <h2>{{ title }}</h2>
                <div>
                    timer: {{ timer.start ? service.formatTime((timer.now - timer.start) ?? 0) : '--' }}
                    <button v-if="timer.start" class="btn btn-primary" @click="stopTimer">Остановить</button>
                </div>
                <div class="base-layout__header-profile ">
                    <router-link class="flex" :to="{name: 'profile'}">
                        <svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M24 42C33.941 42 42 33.941 42 24C42 14.059 33.941 6 24 6C14.059 6 6 14.059 6 24C6 33.941 14.059 42 24 42ZM24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z"
                                  fill="black"/>
                            <path
                                d="M12 35.63C12 34.597 12.772 33.724 13.8 33.61C21.515 32.756 26.52 32.833 34.218 33.629C34.6024 33.6694 34.9667 33.8208 35.2665 34.0648C35.5663 34.3089 35.7885 34.6349 35.906 35.0031C36.0235 35.3714 36.0312 35.7658 35.9282 36.1384C35.8252 36.5109 35.616 36.8454 35.326 37.101C26.241 45.02 21.049 44.911 12.64 37.109C12.23 36.729 12 36.188 12 35.63Z"
                                fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M34.115 34.623C26.478 33.833 21.545 33.759 13.909 34.604C13.6576 34.6333 13.4259 34.7543 13.2582 34.9438C13.0905 35.1333 12.9986 35.378 13 35.631C13 35.917 13.119 36.188 13.32 36.376C17.488 40.242 20.646 41.989 23.733 42C26.831 42.011 30.159 40.278 34.669 36.348C34.8123 36.2205 34.9154 36.0541 34.9659 35.869C35.0164 35.684 35.012 35.4883 34.9533 35.3056C34.8946 35.123 34.7842 34.9614 34.6354 34.8404C34.4865 34.7194 34.3058 34.6432 34.115 34.623ZM13.69 32.616C21.486 31.753 26.564 31.831 34.322 32.634C34.9003 32.6944 35.4485 32.9221 35.8994 33.2892C36.3503 33.6563 36.6844 34.1469 36.8607 34.7009C37.0371 35.255 37.0481 35.8484 36.8924 36.4086C36.7367 36.9688 36.421 37.4715 35.984 37.855C31.409 41.843 27.599 44.015 23.727 44C19.844 43.986 16.202 41.777 11.961 37.842C11.6574 37.5592 11.4153 37.2168 11.2499 36.8362C11.0846 36.4556 10.9995 36.045 11 35.63C10.9985 34.8845 11.2722 34.1646 11.7686 33.6082C12.2649 33.0519 12.9491 32.6992 13.69 32.616Z"
                                  fill="black"/>
                            <path
                                d="M32 20C32 22.1217 31.1571 24.1566 29.6569 25.6569C28.1566 27.1571 26.1217 28 24 28C21.8783 28 19.8434 27.1571 18.3431 25.6569C16.8429 24.1566 16 22.1217 16 20C16 17.8783 16.8429 15.8434 18.3431 14.3431C19.8434 12.8429 21.8783 12 24 12C26.1217 12 28.1566 12.8429 29.6569 14.3431C31.1571 15.8434 32 17.8783 32 20Z"
                                fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M24 26C25.5913 26 27.1174 25.3679 28.2426 24.2426C29.3679 23.1174 30 21.5913 30 20C30 18.4087 29.3679 16.8826 28.2426 15.7574C27.1174 14.6321 25.5913 14 24 14C22.4087 14 20.8826 14.6321 19.7574 15.7574C18.6321 16.8826 18 18.4087 18 20C18 21.5913 18.6321 23.1174 19.7574 24.2426C20.8826 25.3679 22.4087 26 24 26ZM24 28C26.1217 28 28.1566 27.1571 29.6569 25.6569C31.1571 24.1566 32 22.1217 32 20C32 17.8783 31.1571 15.8434 29.6569 14.3431C28.1566 12.8429 26.1217 12 24 12C21.8783 12 19.8434 12.8429 18.3431 14.3431C16.8429 15.8434 16 17.8783 16 20C16 22.1217 16.8429 24.1566 18.3431 25.6569C19.8434 27.1571 21.8783 28 24 28Z"
                                  fill="black"/>
                        </svg>

                        {{ user.name }}
                    </router-link>
                </div>
            </div>


            <div class="base-layout__content">

                <RouterView/>

            </div>
        </div>


    </div>
</template>

<script>

import {RouterLink, RouterView} from 'vue-router'
import api from "@/api";
import {mapActions, mapGetters} from "vuex";


export default {
    data: function () {
        return {
            menu: {
                projects: false,
                projects2: false,
            },
            projectList: [],
        }
    },

    mounted() {
        this.getProjectList()
    },

    methods: {
        ...mapActions(['setTimer']),

        getProjectList() {
            api.project.getList().then(response => {
                this.projectList = response.data
            });
        },

        stopTimer() {
            api.timer.stop().then((response) => {
                this.setTimer(response.data)
            });
        }
    },


    computed: {
        ...mapGetters({
            timer: 'getTimer',
            title: 'getTitle',
            user: 'getUser'
        })
    }


}

</script>

<style lang="sass">
@import '@/assets/sass/base-layout'
</style>