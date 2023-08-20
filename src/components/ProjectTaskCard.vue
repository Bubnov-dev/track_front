<template>
    <div class="project__task card">
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
                <div class="project__additional-menu card"
                     onclick="event.stopPropagation()">
                    <div class="project__additional-menu-item">
                        <button class="btn" @click="deleteTask(element.id)">Удалить</button>
                    </div>
                    <div class="project__additional-menu-item"
                         @click="showEditForm(element)">
                        <button class="btn">Отредактировать</button>
                    </div>
                </div>
            </div>
        </div>

        <form v-if="element.edit == true" class="project__task-rename"
              @submit.prevent="renameTask(element)">
            <input type="text" v-model="element.name">
            <button class="btn btn-primary">сохранить</button>
        </form>
        <template v-else>
            <div class="project__task-content" @click.stop="openPreview(element.id)">
                {{ element.name }}
            </div>
            <div class="project__additional flex">
                <div class="timer" :class="{'active' : element.id == timer.task_id}">
                    <!--                                                <router-link @click.stop=""-->
                    <!--                                                             :to="{name: 'project', params: {id: project.id}, query: {taskId: element.id}}"-->
                    <!--                                                             class="timer__btn timer__btn&#45;&#45;enter">-->
                    <!--                                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"-->
                    <!--                                                         data-testid="LowPriorityRoundedIcon">-->
                    <!--                                                        <path fill="white"-->
                    <!--                                                              d="M15 5h6c.55 0 1 .45 1 1s-.45 1-1 1h-6c-.55 0-1-.45-1-1s.45-1 1-1zm0 5.5h6c.55 0 1 .45 1 1s-.45 1-1 1h-6c-.55 0-1-.45-1-1s.45-1 1-1zm0 5.5h6c.55 0 1 .45 1 1s-.45 1-1 1h-6c-.55 0-1-.45-1-1s.45-1 1-1zm-5.15 3.15 1.79-1.79c.2-.2.2-.51 0-.71l-1.79-1.79c-.31-.32-.85-.1-.85.35v3.59c0 .44.54.66.85.35zM9 16h-.3c-2.35 0-4.45-1.71-4.68-4.05C3.76 9.27 5.87 7 8.5 7H11c.55 0 1-.45 1-1s-.45-1-1-1H8.5c-3.86 0-6.96 3.4-6.44 7.36C2.48 15.64 5.43 18 8.73 18H9"></path>-->
                    <!--                                                    </svg>-->
                    <!--                                                </router-link>-->

                    <div class="timer__time" @click="openTimer(element.id, this.element.time)">
                        {{ service.formatTime(parseInt(element.time  ?? 0) + parseInt((element.id === timer.task_id) ? timer.actualSec : 0)) }}
                    </div>

                    <button class="timer__btn timer__btn--start"
                            @click="startTimerTask(element.id)">
                        <svg width="11" height="14" viewBox="0 0 11 14" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.525 13.0251C1.19167 13.2417 0.854 13.2541 0.512 13.0621C0.170667 12.8707 0 12.5751 0 12.1751V1.82508C0 1.42508 0.170667 1.12908 0.512 0.93708C0.854 0.745747 1.19167 0.758413 1.525 0.97508L9.675 6.15008C9.975 6.35008 10.125 6.63341 10.125 7.00008C10.125 7.36675 9.975 7.65008 9.675 7.85008L1.525 13.0251Z"
                                fill="white"/>
                        </svg>
                    </button>
                    <button class="timer__btn timer__btn--stop" @click="stopTimer">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 14C9.45 14 8.97933 13.8043 8.588 13.413C8.196 13.021 8 12.55 8 12V2C8 1.45 8.196 0.979333 8.588 0.588C8.97933 0.196 9.45 0 10 0H12C12.55 0 13.021 0.196 13.413 0.588C13.8043 0.979333 14 1.45 14 2V12C14 12.55 13.8043 13.021 13.413 13.413C13.021 13.8043 12.55 14 12 14H10ZM2 14C1.45 14 0.979333 13.8043 0.588 13.413C0.196 13.021 0 12.55 0 12V2C0 1.45 0.196 0.979333 0.588 0.588C0.979333 0.196 1.45 0 2 0H4C4.55 0 5.021 0.196 5.413 0.588C5.80433 0.979333 6 1.45 6 2V12C6 12.55 5.80433 13.021 5.413 13.413C5.021 13.8043 4.55 14 4 14H2Z"
                                fill="white"/>
                        </svg>
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import service from "../service";
import {mapGetters} from "vuex";

export default {
    name: 'project-task-card',

    props: {
        element: Object,
    },

    methods: {
        deleteTask() {
            this.$emit('request-delete-task', this.element.id);
        },

        showEditForm() {
            this.$emit('request-show-edit-form', this.element);
        },

        renameTask() {
            this.$emit('request-rename-task', this.element);
        },

        openPreview() {
            this.$emit('request-open-preview', this.element.id);
        },

        openTimer() {
            this.$emit('request-open-timer', this.element.id);
        },

        startTimerTask() {
            this.$emit('request-start-timer', this.element.id);
        },

        stopTimer() {
            this.$emit('request-stop-timer');
        }

    },

    computed: {
        service() {
            return service
        },
        ...mapGetters({
            timer: 'getTimer',
        }),
    }
}
</script>