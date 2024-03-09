<template>
    <div class="project-items">

        <div class="up-menu">
            <button class="btn btn-primary" @click="testModal = true">
                Добавить проект
            </button>
        </div>
        <div class="project-list">

            <div class="card project-item" v-for="project in projects" :key="project.id">
                <div class="flex justify-content-between">

                <h3 class="project-item__title"><router-link :to="{name : 'project', params: {id : project.id}}">{{ project.name }}</router-link></h3>
                    <div class="tooltip">

                    <button class="project__task-additional tooltip-btn btn">
                        <svg width="4" height="16" viewBox="0 0 4 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2 12C2.53043 12 3.03914 12.2107 3.41421 12.5858C3.78929 12.9609 4 13.4696 4 14C4 14.5304 3.78929 15.0391 3.41421 15.4142C3.03914 15.7893 2.53043 16 2 16C1.46957 16 0.96086 15.7893 0.585787 15.4142C0.210714 15.0391 0 14.5304 0 14C0 13.4696 0.210714 12.9609 0.585787 12.5858C0.96086 12.2107 1.46957 12 2 12ZM2 6C2.53043 6 3.03914 6.21071 3.41421 6.58579C3.78929 6.96086 4 7.46957 4 8C4 8.53043 3.78929 9.03914 3.41421 9.41421C3.03914 9.78929 2.53043 10 2 10C1.46957 10 0.96086 9.78929 0.585787 9.41421C0.210714 9.03914 0 8.53043 0 8C0 7.46957 0.210714 6.96086 0.585787 6.58579C0.96086 6.21071 1.46957 6 2 6ZM2 0C2.53043 0 3.03914 0.210714 3.41421 0.585786C3.78929 0.960859 4 1.46957 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4C1.46957 4 0.96086 3.78929 0.585787 3.41421C0.210714 3.03914 0 2.53043 0 2C0 1.46957 0.210714 0.960859 0.585787 0.585786C0.96086 0.210714 1.46957 0 2 0Z"
                                fill="black"/>
                        </svg>
                    </button>
                    <div class="tooltip-menu">

                        <div class="project__additional-menu card" onclick="event.stopPropagation()">
                            <div class="project__additional-menu-item">
                                <button class="btn" @click="deleteProject(project.id)">Удалить</button>
                            </div>
                            <div class="project__additional-menu-item" @click.stop="">
                                <button class="btn">Отредактировать</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="project-item__tasks">
                    <div class="task" v-for="task in project.last_tasks" :key="task.id">
                        <label class="checkbox-wrapper">
                            <input type="checkbox">
                            <input type="checkbox">
                            <div class="fake-checkbox">

                            </div>
                        </label>
                        {{ task.name }}
                    </div>

                </div>
            </div>
        </div>
        <modal-component v-model="testModal" title="Новый проект">
            <form @submit.prevent="createProject">
                <input-view type="text" placeholder="Название" v-model="newProject.name" inputClass="big"/>
                <input-view type="text" placeholder="знак валюты" v-model="newProject.currency_sign" inputClass="big"/>
                <div class="flex justify-content-between">
                    <span class="fs-075rem">Статусы</span>
                    <div class="cp" @click.stop="newProject.statuses.push({})">+</div>
                </div>
                <draggable
                    :list="newProject.statuses"
                    :disabled="!enabled"
                    item-key=""
                    class="list-group"
                    ghost-class="ghost"
                    @end="renewOrders"
                >
                    <template #item="{ element, idx }">
                        <div class="p-2 border border-3 flex" :class="{ 'not-draggable': !enabled }">
                            {{ element.order }}
                            <input class="p-2" type="text" v-model="element.name">
                            <div class="btn btn-primary pt-2 pb-2" @click="newProject.statuses.splice(idx, 1)">
                                <svg width="15" height="15" viewBox="0 0 162 161" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M158.7 146.3C160.202 147.817 161.045 149.865 161.045 152C161.045 154.135 160.202 156.183 158.7 157.7C157.171 159.178 155.127 160.005 153 160.005C150.873 160.005 148.829 159.178 147.3 157.7L81.0001 91.2999L14.7001 157.7C13.171 159.178 11.1271 160.005 9.00008 160.005C6.87303 160.005 4.8292 159.178 3.30008 157.7C1.79783 156.183 0.955078 154.135 0.955078 152C0.955078 149.865 1.79783 147.817 3.30008 146.3L69.7001 79.9999L3.30008 13.6999C2.02438 12.1456 1.37244 10.1723 1.47108 8.16385C1.56972 6.15543 2.41189 4.2555 3.83376 2.83362C5.25564 1.41174 7.15557 0.569581 9.16399 0.47094C11.1724 0.3723 13.1457 1.02423 14.7001 2.29994L81.0001 68.6999L147.3 2.29994C148.854 1.02423 150.828 0.3723 152.836 0.47094C154.845 0.569581 156.745 1.41174 158.166 2.83362C159.588 4.2555 160.43 6.15543 160.529 8.16385C160.628 10.1723 159.976 12.1456 158.7 13.6999L92.3001 79.9999L158.7 146.3Z" fill="white"></path></svg>
                            </div>
                        </div>
                    </template>
                </draggable>
                <button class="btn btn-primary">Сохранить</button>
            </form>

        </modal-component>
    </div>

</template>

<script>
import CheckboxView from "../components/CheckboxView.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import api from "@/api"
import {mapActions} from "vuex";
import vuedraggable from "vuedraggable/src/vuedraggable";
import {useToast} from "vue-toastification";
import InputView from "../components/InputView.vue";

export default {
    name: 'projects-view',

    components: {
        InputView,
        CheckboxView,
        ModalComponent,

        draggable: vuedraggable
    },

    data: function () {
        return {
            projects: [],
            testModal: false,
            newProject: {
                statuses: [
                    // { name: "John", id: 0 },
                    // { name: "Joao", id: 1 },
                    // { name: "Jean", id: 2 }
                ]
            },

            enabled: true,
            list: [
                { name: "John", id: 0 },
                { name: "Joao", id: 1 },
                { name: "Jean", id: 2 }
            ],
            dragging: false
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
            for(let i = 0; i < this.newProject.statuses.length; i++){
                this.newProject.statuses[i].order = i+1
            }
            api.project.create(this.newProject).then(response => {
                console.log(response.data)
                this.projects.push(response.data)
                this.closeModal()
            }).catch(error => {
                console.log(error)
            })
        },

        deleteProject(id){
            api.project.delete(id).then(response => {
                this.projects = this.projects.filter(el => el.id !== id)
            }).catch(error => {
                console.log(error)
                useToast().error('Ошибка удаления')
            })
        },

        closeModal() {
            this.testModal = false
            this.newProject = {
                statuses: []
            }
        },
    }
}

</script>

<style lang="sass">
@import "@/assets/sass/projects"
@import "@/assets/sass/preview"
</style>
