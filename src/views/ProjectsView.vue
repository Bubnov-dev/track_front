<template>
    <div class="project-items">

        <div class="up-menu">
            <button class="btn btn-primary" @click="testModal = true">
                Добавить проект
            </button>
        </div>
        <div class="project-list">

            <div class="card project-item" v-for="project in projects" :key="project.id">
                <h3 class="project-item__title"><router-link :to="{name : 'project', params: {id : project.id}}">{{ project.name }}</router-link></h3>

                <div class="project-item__tasks">
                    <div class="task" v-for="task in project.last_tasks" :key="task.id">
                        <label class="checkbox-wrapper">
                            <input type="checkbox">
                            <div class="fake-checkbox">

                            </div>
                        </label>
                        {{ task.name }}
                    </div>

                </div>
            </div>
        </div>
        <modal-view v-model="testModal">
            <h2 class="h2">Новый проект</h2>
            <form @submit.prevent="createProject">
                <input type="text" v-model="newProject.name">
                <button class="btn btn-primary">Сохранить</button>
            </form>

        </modal-view>
    </div>

</template>

<script>
import CheckboxView from "../components/CheckboxView.vue";
import ModalView from "../components/ModalView.vue";
import api from "@/api"
import {mapActions} from "vuex";

export default {
    name: 'projects-view',

    components: {
        CheckboxView,
        ModalView
    },

    data: function () {
        return {
            projects: [],
            testModal: false,
            newProject: {}
        }
    },

    mounted() {
        this.setTitle('Проекты')
        api.project.my().then((msg) => {
            this.projects = msg.data
        })
    },

    methods: {
        ...mapActions(['setTitle']),

        createProject(){
            api.project.create(this.newProject).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}

</script>

<style lang="sass">
@import "@/assets/sass/projects"
</style>
