<script setup>
import service from "@/service";
</script>

<template>
    <div class="project">
        <div class="project__loading" v-if="loading.project">
            loading...
        </div>
        <div class="project__content" v-else>
            <div class="project__timer">

                Итого:
                <span>{{ service.formatTime(project.time ?? 0) }}</span>
            </div>

            <div class="project__statuses card">
                <div class="project__status" v-for="status in project.statuses" :key="status.id">
                    <h3>{{ status.name }}</h3>
                    <div class="project__tasks">
                        <div class="project__task"
                             v-for="task in project.tasks.filter(t => t.status_id == status.id)" :key="task.id">
                            <div class="project__task-content">
                                {{ task.name }}
                            </div>
                            <div class="project__additional flex">
                                <div class="timer">
                                    <div class="timer__time">

                                        {{ service.formatTime(task.time ?? 0) }}
                                    </div>

                                    <button class="timer__btn" @click="startTimerTask(task.id)">
                                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6 2V0H12V2H6ZM8 13H10V7H8V13ZM9 21C7.76667 21 6.604 20.7627 5.512 20.288C4.42067 19.8127 3.46667 19.1667 2.65 18.35C1.83333 17.5333 1.18733 16.5793 0.712 15.488C0.237333 14.396 0 13.2333 0 12C0 10.7667 0.237333 9.604 0.712 8.512C1.18733 7.42067 1.83333 6.46667 2.65 5.65C3.46667 4.83333 4.42067 4.18767 5.512 3.713C6.604 3.23767 7.76667 3 9 3C10.0333 3 11.025 3.16667 11.975 3.5C12.925 3.83333 13.8167 4.31667 14.65 4.95L16.05 3.55L17.45 4.95L16.05 6.35C16.6833 7.18333 17.1667 8.075 17.5 9.025C17.8333 9.975 18 10.9667 18 12C18 13.2333 17.7627 14.396 17.288 15.488C16.8127 16.5793 16.1667 17.5333 15.35 18.35C14.5333 19.1667 13.5793 19.8127 12.488 20.288C11.396 20.7627 10.2333 21 9 21Z"
                                                fill="#ddd"/>
                                        </svg>


                                    </button>
                                </div>

<!--                                <button class="project__next-task" @click="nextStatus(task.id)">-->
<!--                                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none"-->
<!--                                         xmlns="http://www.w3.org/2000/svg">-->
<!--                                        <path d="M1.4 12L0 10.6L4.6 6L0 1.4L1.4 0L7.4 6L1.4 12Z" fill="black"/>-->
<!--                                    </svg>-->

<!--                                </button>-->
                            </div>

                        </div>

                        <div class="card project__card-new">
                            <button class="project__card-new-btn btn" @click="showTaskForm">
                                <svg width="30" height="30" viewBox="0 0 18 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M8 14H10V10H14V8H10V4H8V8H4V10H8V14ZM2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V2C0 1.45 0.195667 0.979 0.587 0.587C0.979 0.195667 1.45 0 2 0H16C16.55 0 17.021 0.195667 17.413 0.587C17.8043 0.979 18 1.45 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2ZM2 16H16V2H2V16Z"
                                        fill="black"/>
                                </svg>

                            </button>
                            <form class="project__task-form" @submit.prevent="createTask">
                                <input type="text" placeholder="Новая задача" v-model="newTask.name">
                                <input type="hidden" name="status" :value="status.id">
                                <button class="btn btn-primary">Добавить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import api from "@/api"
import {useToast} from "vue-toastification";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ProjectView",

    mounted() {

        api.project.get(this.$route.params.id).then((response) => {
            console.log(response.data)
            this.project = response.data
            this.setTitle(this.project.name)

            this.loading.project = false
            if (this.timer.start) {

                if (this.timer.project_id == this.project.id) {
                    if (this.timer.task_id) {
                        if (this.project.tasks) {
                            let task = this.project.tasks.find(el => el.id == this.timer.task_id);
                            if (task) {
                                task.time += (this.timer.now - this.timer.start)
                            }
                        }
                    }

                    this.project.time += (this.timer.now - this.timer.start);
                }
            }

        }).catch(error => {
            console.log(error)
        })
    },

    data: function () {
        return {
            project: {},
            newTask: {},
            loading: {
                project: true
            }
        }
    },

    methods: {
        ...mapActions(['setTimer', 'setTitle']),

        showTaskForm(e) {
            document.querySelectorAll('.project__card-new').forEach(el => {
                el.classList.remove('open')
            })
            e.target.parentElement.classList.add('open')
        },

        createTask(e) {
            this.newTask.status_id = e.target.elements['status']._value
            this.newTask.project_id = this.project.id
            api.task.create(this.newTask).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        },

        nextStatus(id) {
            api.task.nextStatus(id).then(response => {
                useToast().success('перенесено')
            }).catch(error => {
                useToast().error('Ошибка')
            });
        },

        startTimerTask(task_id) {
            api.timer.start(task_id).then(response => {
                this.setTimer(response.data)
                useToast().success('засечено')
            }).catch(error => {
                useToast().error('Ошибка')
            });
        },


        startTimerProject(project_id) {
            api.timer.start(null, project_id).then(response => {
                this.setTimer(response.data)
                useToast().success('засечено')
            }).catch(error => {
                useToast().error('Ошибка')
            });
        },

        stopTimer() {
            api.timer.stopTimer().then(response => {
                useToast().success('остановлено')
            }).catch(error => {
                useToast().error('Ошибка')
            });
        }
    },

    computed: {
        ...mapGetters({
            timer: 'getTimer'
        })
    },

    watch: {
        timer: {
            handler() {
                if (this.timer.start) {
                    if (this.timer.project_id == this.project.id) {
                        if (this.timer.task_id) {
                            if (this.project.tasks) {
                                let task = this.project.tasks.find(el => el.id == this.timer.task_id);
                                if (task) {
                                    task.time++
                                }
                            }
                        }
                        this.project.time++;
                    }
                }

            },
            deep: true
        }
    }
}
</script>
