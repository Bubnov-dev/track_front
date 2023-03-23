<script setup>
import service from "@/service";
</script>

<template>
    <div class="project">
        <div class="preview" :class="{'active': preview}">
            <div class="preview__content" v-if="previewTask">
                <div class="preview__header flex align-items-baseline">
                    <h2>{{ previewTask.parent_task.name }}</h2>
                    <button class="preview__button" @click="preview = false">
                        <svg class="Icon CloseIcon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                            <path
                                d="M2,14.5h18.4l-7.4-7.4c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l10,10c0.6,0.6,0.6,1.5,0,2.1l-10,10c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l7.4-7.4H2c-0.8,0-1.5-0.7-1.5-1.5C0.5,15.3,1.2,14.5,2,14.5z M28,3.5C28,2.7,28.7,2,29.5,2S31,2.7,31,3.5v25c0,0.8-0.7,1.5-1.5,1.5S28,29.3,28,28.5V3.5z"></path>
                        </svg>
                    </button>
                </div>
                <router-link @click.stop="" class="preview__link"
                             :to="{name: 'project', params: {id: project.id}, query: {taskId: previewTask.parent_task.id}}">
                    Перейти на страницу задачи
                </router-link>
                <div class="preview__description">
                    {{ previewTask.parent_task.description }}
                </div>

                <div class="preview__statuses" v-for="status in previewTask.statuses" :key="status.id">
                    <div class="preview__status">
                        <h3 class="project__status-title preview__status-title">{{ status.name }}</h3>
                        <div class="preview__task"
                             v-for="task in previewTask.tasks.filter(t => t.status_id == status.id)"
                             :key="task.id">
                            {{ task.name }}
                        </div>
                    </div>
                </div>

                <div class="preview__comments">
                    <h3>Комментарии</h3>
                    <div class="preview__comment" v-for="com in previewTask.parent_task.comments" :key="com.id">
                        <div class="comment__header">

                            <div class="comment__author">
                                {{ com.id }}
                            </div>
                            <div class="comment__date">
                                {{ new Date(com.created_at).toLocaleDateString('Ru-ru') }}
                                {{ new Date(com.created_at).toLocaleTimeString('Ru-ru') }}
                            </div>
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
                                        <button class="btn" @click="deleteComment(com.id)">Удалить</button>
                                    </div>
                                    <div class="project__additional-menu-item">
                                        <button class="btn" @click="newComment=com">Редактировать</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="comment__content">{{ com.content }}</div>
                    </div>
                </div>
                <div class="preview__comment-form">
                    <form @submit.prevent="">
                        <div class="flex">
                            <textarea class="comment" v-model="newComment.content" placeholder="Комментарий"
                                      rows="3"></textarea>
                            <button class="preview__button preview__button-comment"
                                    @click="createComment(previewTask.parent_task.id)">
                                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
                                     focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                     data-testid="SendRoundedIcon">
                                    <path
                                        d="m3.4 20.4 17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="project__loading" v-if="loading.project">
            loading...
        </div>
        <div class="project__content" v-else>
            <div class="project__parent-task" v-if="project.parent_task">
                <div class="project__parent-task-header">
                    <router-link :to="{name: 'project', params: {id: project.id}}"
                                 class="project__parent-task-back"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z" fill="white"/>
                        </svg>
                    </router-link>
                    <h3>Задача: {{ project.parent_task.name }}</h3>
                </div>
                <!--                <div class="flex">-->
                <!--                    <h4>Описание</h4>-->
                <!--                    <button class="btn btn-primary" @click="focusDesc">Поменять</button>-->
                <!--                </div>-->
                <textarea id="desc" class="hidden-textarea project__parent-task-description"
                          v-model="project.parent_task.description"
                          @change="updateTaskDescription(project.parent_task)"
                          placeholder="Опишите задачу"></textarea>
            </div>
            <div class="flex justify-between align-items-baseline pe-3">
                <div>
                    <div class="flex">
                        <h4>Время</h4>
                        <span>{{ service.formatTime(project.time ?? 0) }}</span>
                    </div>
                    <div class="flex align-items-baseline">
                        <h4 class="mt-0">Чье</h4>
                        <select class="form-select" v-model="timing_user" @change="getProject">
                            <option value="all">Общее</option>
                            <option v-for="projectUser in project.users" :key="projectUser.id" :value="projectUser.id">
                                {{ projectUser.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div>
                    <h4>Пользователи</h4>
                    <div class="flex project__users">
                        <div class="card p-2 flex" :class="{'cp':projectUser.id != project.user_id}"
                             v-for="projectUser in project.users" :key="projectUser.id"
                             @click="if(projectUser.id != project.user_id)
                              openUpdateUser(projectUser);">
                            {{ projectUser.name }}
                            <button class="btn" v-if="projectUser.id != project.user_id"
                                    @click.stop="removeUser(projectUser.id)">
                                <svg width="9" height="9" viewBox="0 0 162 161" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M158.7 146.3C160.202 147.817 161.045 149.865 161.045 152C161.045 154.135 160.202 156.183 158.7 157.7C157.171 159.178 155.127 160.005 153 160.005C150.873 160.005 148.829 159.178 147.3 157.7L81.0001 91.2999L14.7001 157.7C13.171 159.178 11.1271 160.005 9.00008 160.005C6.87303 160.005 4.8292 159.178 3.30008 157.7C1.79783 156.183 0.955078 154.135 0.955078 152C0.955078 149.865 1.79783 147.817 3.30008 146.3L69.7001 79.9999L3.30008 13.6999C2.02438 12.1456 1.37244 10.1723 1.47108 8.16385C1.56972 6.15543 2.41189 4.2555 3.83376 2.83362C5.25564 1.41174 7.15557 0.569581 9.16399 0.47094C11.1724 0.3723 13.1457 1.02423 14.7001 2.29994L81.0001 68.6999L147.3 2.29994C148.854 1.02423 150.828 0.3723 152.836 0.47094C154.845 0.569581 156.745 1.41174 158.166 2.83362C159.588 4.2555 160.43 6.15543 160.529 8.16385C160.628 10.1723 159.976 12.1456 158.7 13.6999L92.3001 79.9999L158.7 146.3Z"
                                        fill="black"/>
                                </svg>
                            </button>
                        </div>
                        <button class="btn btn-primary" @click="openNewUser">+</button>
                    </div>
                </div>
            </div>

            <div class="project__statuses" :class="{'task' : project.parent_task}">
                <div class="project__statuses-content">

                    <div class="project__status" v-for="status in project.statuses" :key="status.id">

                        <draggable
                            class="project__tasks"
                            :data-status-id="status.id"
                            :list="project.tasks.filter(t => t.status_id == status.id)"
                            :group="{ name: status.name, put: true, pull: 'clone' }"
                            :sort="false"
                            item-key="id"
                            @end="endStatus"
                        >
                            <template #header>
                                <h3 class="project__status-title">{{ status.name }}</h3>
                            </template>
                            <template #item="{ element }" :key="element.id">
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

                                                <div class="timer__time" @click="openTimer(element.id, element.time)">
                                                    {{ service.formatTime(element.time ?? 0) }}
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
                            <template #footer>
                                <div class="project__card-new" key="footer">
                                    <button class="project__card-new-btn btn" @click="showTaskForm">
                                        <svg width="30" height="25" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8 14H10V10H14V8H10V4H8V8H4V10H8V14ZM2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V2C0 1.45 0.195667 0.979 0.587 0.587C0.979 0.195667 1.45 0 2 0H16C16.55 0 17.021 0.195667 17.413 0.587C17.8043 0.979 18 1.45 18 2V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2ZM2 16H16V2H2V16Z"
                                                fill="white"/>
                                        </svg>

                                    </button>
                                    <form class="project__task-form" @submit.prevent="createTask">
                                        <input type="text" placeholder="Новая задача" v-model="newTask.name">
                                        <input type="hidden" name="status" :value="status.id">
                                        <button class="btn">Добавить</button>
                                    </form>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>


        <modal-component v-model="modals.timer">
            Time:{{
                project.tasks ? (project.tasks.filter((el) => el.id == currentTimer.task_id)[0] ? service.formatTime(project.tasks.filter((el) => el.id == currentTimer.task_id)[0].time ?? 0) : project.tasks.filter((el) => el.id == currentTimer.task_id)) : '-'
            }}
            <form @submit.prevent="">
                <div class=" flex-timer">
                    <!--                    <div class="btn btn-primary" @click="currentTimer.plus = !currentTimer.plus">-->
                    <!--                        <template v-if="currentTimer.plus">+</template>-->
                    <!--                        <template v-else>-</template>-->
                    <!--                    </div>-->

                    <!--                    <input type="text" v-model="currentTimer.hours">-->
                    <!--                    <span class="timer-divider">:</span>-->
                    <!--                    <input type="text" v-model="currentTimer.minutes">-->
                    <!--                    <span class="timer-divider">:</span>-->
                    <!--                    <input type="text" v-model="currentTimer.seconds">-->
                    <label>Начало</label>
                    <label></label>
                    <label>Конец</label>
                    <label>Всего</label>
                    <input type="time" v-model="currentTimer.start">
                    <span class="timer-divider">-</span>
                    <input type="time" v-model="currentTimer.end">
                    <input type="time" v-model="currentTimer.time">

                </div>
                <div class="flex">
                    <div class="btn btn-primary"
                         @click="currentTimer.plus = true; updateTimer()">
                        Добавить
                    </div>
                    <div class="btn btn-primary"
                         @click="currentTimer.plus = false; updateTimer()">
                        Убавить
                    </div>
                </div>

                <!--                <button class="btn btn-primary">Сохранить</button>-->

            </form>
            <!--             //todo функция корректировки времени-->
            <!--            <form @submit.prevent="">-->
            <!--                <div class="flex">-->
            <!--                    <input type="time" v-model="currentTimer.start">-->
            <!--                    <span class="timer-divider">-</span>-->
            <!--                    <input type="time" v-model="currentTimer.end">-->
            <!--                </div>-->
            <!--                <button class="btn btn-primary">Сохранить</button>-->
            <!--            </form>-->
        </modal-component>

        <modal-component v-model="modals.newUser">
            <form @submit.prevent="saveNewUser" class="form">
                <div class="flex">

                    <select class="form-select pb-1 pt-1" v-model="newUser.role">
                        <option value="observer">observer</option>
                        <option value="worker">worker</option>
                        <option value="admin">admin</option>
                    </select>
                    <input class="p-1 fs-1rem" type="email" v-model="newUser.email">
                </div>
                <button class="btn btn-primary">Сохранить</button>

            </form>
        </modal-component>
    </div>
</template>

<script>
import api from "@/api"
import {useToast} from "vue-toastification";
import {mapActions, mapGetters} from "vuex";
import vuedraggable from "vuedraggable/src/vuedraggable";

export default {
    name: "ProjectView",

    components: {
        draggable: vuedraggable
    },

    mounted() {
        this.getProject();
    },

    data: function () {
        return {
            modals: {
                timer: false,
                newUser: false
            },
            timing_user: null,
            project: {},
            newTask: {},
            newUser: {},
            newComment: {},
            loading: {
                project: true
            },

            myArray: [],
            drag: false,
            currentTimer: {
                plus: true,
                hours: 0,
                minutes: 0,
                seconds: 0,
                time: 0,
                start: '',
                end: '',
            },

            preview: false,
            previewTask: null,
        }
    },

    methods: {
        ...mapActions(['setTimer', 'setTitle']),
        pullFunction(e) {
            console.log(e)
        },
        openNewUser() {
            this.modals.newUser = true
        },
        saveNewUser() {
            api.project.inviteUser(this.project.id, this.newUser.email, this.newUser.role).then(response => {
                if (response.data) {
                    this.project.users.push(response.data)
                    this.modals.newUser = false
                } else {
                    throw Error;
                }
            }).catch(error => {
                useToast().error('Ошибка')
            })
        },
        updateUser() {
            api.project.updateUser(this.project.id, this.newUser.email, this.newUser.role).then(response => {
                if (response.data) {
                    this.modals.newUser = false
                } else {
                    throw Error;
                }
            }).catch(error => {
                useToast().error('Ошибка')
            })
        },
        removeUser(user_id) {
            api.project.removeUser(this.project.id, user_id).then(response => {
                useToast().success('пользователь удален')
                this.project.users = this.project.users.filter(el => el.id != user_id)
            }).catch(error => {
                console.log(error)
                useToast().error('Не получилось удалить')
            })
        },
        openUpdateUser(user) {
            this.newUser = user
            this.modals.newUser = true
        },

        openTimer(task_id, time) {
            this.modals.timer = true;
            console.log(task_id)
            this.currentTimer.task_id = task_id
            this.currentTimer.time = time
        },

        updateTimer() {
            let time = Number.parseInt(this.currentTimer.time.substr(6, 2)) + Number.parseInt(60 * this.currentTimer.time.substr(3, 2)) + Number.parseInt(3600 * this.currentTimer.time.substr(0, 2));
            if (!this.currentTimer.plus) {
                time = '-' + time
            }
            api.timer.updateTiming(time, this.currentTimer.task_id, this.project.id).then(response => {
                this.project.time += Number.parseInt(time)
                this.project.tasks.find(el => el.id == this.currentTimer.task_id).time += Number.parseInt(time)
                this.modals.timer = false
            }).catch(error => {
                useToast().error('Ошибка')
                сonsole.log(error)
            })
        },

        moveToStatus(e) {
            console.log(e)
            let status_id = e.to.attributes['data-status-id'].nodeValue
            console.log(status_id)
            console.log(e.draggedContext.element)
            e.draggedContext.element.status_id = status_id

            return false
        },

        endStatus(e) {
            console.log(e)
            let status_id = e.to.attributes['data-status-id'].nodeValue
            let task = Object.entries(e.item)[0][1].element
            task.status_id = status_id
            api.task.changeStatus(task.id, status_id)
        },

        getProject() {
            let parent_task_id = null
            if (this.$route.query.taskId) {
                parent_task_id = this.$route.query.taskId
            }

            api.project.get(this.$route.params.id, this.timing_user, parent_task_id).then((response) => {
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

                if (this.timing_user == null)
                    this.timing_user = this.project.user_id
            }).catch(error => {
                console.log(error)
            })
        },
        focusDesc() {
            document.getElementById('desc').focus()
        },
        showTaskForm(e) {
            document.querySelectorAll('.project__card-new').forEach(el => {
                el.classList.remove('open')
            })
            e.target.parentElement.classList.add('open')
            e.target.parentElement.querySelector("input").focus()
        },

        showEditForm(task) {
            task.edit = true

            document.querySelectorAll('.tooltip-menu').forEach(el => {
                el.classList.remove('open')
            })
        },

        updateTaskDescription(task) {
            api.task.update(task).then(() => {
                useToast().success('Обновлено')
            }).catch(error => {
                useToast().error('Ошибка обновления')
            })
        },
        getTask(id) {
            api.task.get(id).then(response => {
                this.project.parent_task = response.data.task
                this.project.tasks = response.data.tasks
                this.setTitle(this.title + ' - ' + this.project.parent_task.name)
                document.location.hash
            }).catch(error => {
                console.log(error)
                useToast().error('Ошибка получения задачи')
            });
        },

        createTask(e) {
            if (!this.newTask.name) {
                return
            }
            if (this.project.parent_task) {
                this.newTask.task_id = this.project.parent_task.id
            }
            this.newTask.status_id = e.target.elements['status']._value
            this.newTask.project_id = this.project.id
            api.task.create(this.newTask).then(response => {
                console.log(response.data)
                this.project.tasks.push(response.data)
                this.newTask = {}
            }).catch(error => {
                console.log(error)
            })
        },

        renameTask(task) {
            api.task.rename(task.id, task.name).then(() => {
                useToast().success('Изменено')
                task.edit = false
            }).catch(error => {
                useToast().error('Ошибка')

            })
        },

        deleteTask(id) {
            api.task.delete(id).then(response => {
                useToast().success('Задача удалена')
                console.log(this.project.tasks)
                this.project.tasks = this.project.tasks.filter(el => {
                    return el.id !== id
                })
            }).catch(error => {
                useToast().error('Ошибка удаления')
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
            api.timer.stop().then(response => {
                useToast().success('остановлено')
                this.setTimer(response.data)

            }).catch(error => {
                useToast().error('Ошибка')
            });
        },

        openPreview(id) {
            if (!this.preview || this.previewTask.parent_task.id == id)
                this.preview = !this.preview
            if (this.preview) {
                let parent_task_id = this.project.id
                this.loadPreview(id)
            }
        },
        loadPreview(id) {
            api.project.get(this.$route.params.id, this.timing_user, id).then((response) => {
                this.previewTask = response.data
            }).catch(error => {
                console.log(error)
            })
        },

        createComment(task_id) {
            if (this.newComment.id) {
                this.updateComment()
            } else {
                api.comments.create(task_id, this.newComment.content).then((response) => {
                    this.loadPreview(task_id)
                    this.newComment.content = ''
                }).catch((errors) => {
                    console.log(errors)
                })
            }
        },
        updateComment() {
            api.comments.update(this.newComment.id, this.newComment.content).then((response) => {
                this.loadPreview(this.previewTask.parent_task.id)
                this.newComment = {text: ''}
            }).catch((errors) => {
                console.log(errors)
            })
        },
        deleteComment(id) {
            api.comments.delete(id).then((response) => {
                this.loadPreview(this.previewTask.parent_task.id)
            }).catch((errors) => {
                console.log(errors)
            })
        }
    },

    computed: {
        ...mapGetters({
            timer: 'getTimer',
            title: 'getTitle'
        })
    },

    watch: {
        '$route.query': {
            handler() {
                this.getProject()
            },
            deep: true
        },
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
        },
        currentTimer: {
            handler() {
                if (this.currentTimer.start && this.currentTimer.end) {
                    let end = Number.parseInt(this.currentTimer.end.substr(0, 2)) * 3600 + 60 * Number.parseInt(this.currentTimer.end.substr(3, 2))
                    let start = Number.parseInt(this.currentTimer.start.substr(0, 2)) * 3600 + 60 * Number.parseInt(this.currentTimer.start.substr(3, 2))
                    this.currentTimer.time = new Date((end - start) * 1000).toISOString().substr(11, 8)
                }
            },
            deep: true,
        }

    }
}
</script>
