<script setup>
import service from "@/service";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
</script>

<template>
    <div class="project">
        <div class="preview" :class="{'active': preview}">
          <button class="preview__button preview__close" @click="preview = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="6" y1="6" x2="18" y2="18" stroke="black" stroke-width="2"/>
              <line x1="6" y1="18" x2="18" y2="6" stroke="black" stroke-width="2"/>
            </svg>

          </button>
            <div class="preview__content" v-if="previewTask">
                <div class="preview__header flex align-items-baseline">
                    <h2><router-link @click.stop="" class="link"
                                     :to="{name: 'project', params: {id: project.id}, query: {taskId: previewTask.id}}">{{ previewTask.name }} - <span class="preview__link">Перейти</span></router-link></h2>

                </div>
                <div class="preview__description">
                    {{ previewTask.description }}
                </div>
              <span class="mt-3">Создана: {{ new Date(previewTask.created_at).toLocaleDateString('ru')}}</span>

                <div class="preview__statuses">

                    <div class="preview__status" v-for="status in project.statuses" :key="status.id">

                        <draggable
                            class="project__tasks"
                            :data-status-id="status.id"
                            :list="project.tasks.filter(t => t.status_id == status.id && t.task_id == previewTask.id)"
                            :group="{ name: status.name, put: true, pull: 'clone' }"
                            :sort="false"
                            item-key="id"
                            @end="endStatus"
                        >
                            <template #header>
                                <h3 class="project__status-title preview__status-title">{{ status.name }}</h3>
                            </template>
                            <template #item="{ element }" :key="element.id">
                                <div>

                                    <ProjectTaskCard
                                        :element="element"
                                        :timer="timer"
                                        @request-delete-task="deleteTask"
                                        @request-show-edit-form="showEditForm"
                                        @request-rename-task="renameTask"
                                        @request-open-preview="openPreview"
                                        @request-open-timer="openTimer"
                                        @request-start-timer="startTimerTask"
                                        @request-stop-timer="stopTimer"
                                    ></ProjectTaskCard>

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
                                    <form class="project__task-form"
                                          @submit.prevent="createTask($event, previewTask.id)">
                                        <input type="text" placeholder="Новая задача" v-model="newTask.name">
                                        <input type="hidden" name="status" :value="status.id">
                                        <button class="btn">Добавить</button>
                                    </form>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
                <div class="preview__comments">
                    <h3>Комментарии</h3>
                    <div class="preview__comment" v-for="com in previewTask.comments" :key="com.id">
                        <div class="comment__header">

                            <div class="comment__author">
                                {{ com.user.name }}
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
                                    @click="createComment(previewTask.id)">
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
            <div class="project__parent-task" v-if="project.current_task">
                <div class="project__parent-task-header">
                    <router-link :to="{name: 'project', params: {id: project.id}}"
                                 class="project__parent-task-back"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z" fill="white"/>
                        </svg>
                    </router-link>
                    <h3>Задача: {{ project.current_task.name }}</h3>
                </div>
                <!--                <div class="flex">-->
                <!--                    <h4>Описание</h4>-->
                <!--                    <button class="btn btn-primary" @click="focusDesc">Поменять</button>-->
                <!--                </div>-->
                <textarea id="desc" class="hidden-textarea project__parent-task-description"
                          v-model="project.current_task.description"
                          @change="updateTaskDescription(project.current_task)"
                          placeholder="Опишите задачу"></textarea>
            </div>
            <div class="flex justify-between align-items-baseline pe-3">
                <div>
                    <div class="flex">
                        <h4>Время</h4>
                        <span>{{ service.formatTime(project.time ?? 0) }}</span>
                    </div>

                    <div v-if="project.role == 'admin'" class="flex align-items-baseline">
                        <h4 class="mt-0">Чье</h4>
                        <select class="form-select" v-model="timing_user" @change="getProject">
                            <option value="all">Общее</option>
                            <option v-for="projectUser in project.users" :key="projectUser.id" :value="projectUser.id">
                                {{ projectUser.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div v-if="project.role == 'admin'">
                    <h4>Пользователи</h4>
                    <div class="flex project__users">
                        <div class="card p-2 flex" :class="{'cp':projectUser.id != project.user_id}"
                             v-for="projectUser in project.users" :key="projectUser.id"
                             @click="
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

            <div class="project__statuses" :class="{'task' : project.current_task}">
                <div class="project__statuses-content">

                    <div class="project__status" v-for="status in project.statuses" :key="status.id">

                        <draggable
                            class="project__tasks"
                            :data-status-id="status.id"
                            :list="project.tasks.filter(t => t.status_id == status.id && t.task_id == project.current_task_id)"
                            :group="{ name: status.name, put: true, pull: 'clone' }"
                            :sort="false"
                            item-key="id"
                            @end="endStatus"
                        >
                            <template #header>
                                <div class="flex project__status-title">
                                    <h3 class="">{{ status.name }} : </h3>
                                    <span class="project__status-time">
                                    {{ service.formatTime(getTimeOfStatus(status.id).time) }}
                                        <br>
                                    {{ service.formatPriceWithSpace(getTimeOfStatus(status.id).totalPrice) }} {{ project.currency_sign}}
                                    </span>
                                </div>
                            </template>

                            <template #item="{ element }" :key="element.id">
                                <div>

                                    <ProjectTaskCard
                                        :element="element"
                                        :timer="timer"
                                        @request-delete-task="deleteTask"
                                        @request-show-edit-form="showEditForm"
                                        @request-rename-task="renameTask"
                                        @request-open-preview="openPreview"
                                        @request-open-timer="openTimer"
                                        @request-start-timer="startTimerTask"
                                        @request-stop-timer="stopTimer"
                                    ></ProjectTaskCard>

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

            <div>
                <h3>List of timings</h3>
                <ul class="timing-list">
                    <li v-for="timing in formattedTimings" :key="timing.id" class="timing-item">
                        <div class="timing-list__task">{{ timing.task_name }}</div>

                        <div class="datetime-wrapper">
                            <input
                                type="date"
                                v-model="timing.startDate"
                                @change="updateTiming(timing)"
                            >
                            <input
                                type="time"
                                v-model="timing.startTime"
                                @change="updateTiming(timing)"
                            >
                        </div>

                        -
                        <div class="datetime-wrapper">

                            <input
                                type="date"
                                v-model="timing.endDate"
                                @change="updateTiming(timing)"
                            >
                            <input
                                type="time"
                                v-model="timing.endTime"
                                @change="updateTiming(timing)"
                            >
                        </div>

                        ({{ service.formatTime(timing.time) }})

                        <button class="btn-delete" @click="deleteTiming(timing.id)">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H21" stroke="black" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path
                                    d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19ZM10 11V17M14 11V17"
                                    stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </div>
        </modal-component>

        <modal-component v-model="modals.newUser">
            <form @submit.prevent="saveNewUser" class="form">
                <div class="flex">

                    <select class="form-select pb-1 pt-1" v-model="newUser.role">
                        <option value="observer">observer</option>
                        <option value="worker" selected>worker</option>
                        <option value="admin">admin</option>
                    </select>
                    <input class="p-1 fs-1rem" type="email" v-model="newUser.email" placeholder="email ">
                </div>
                <button class="btn btn-primary">Сохранить</button>

            </form>
        </modal-component>

        <modal-component v-model="modals.updateUser">
            {{ updateUser.name }}
            <form @submit.prevent="saveUpdateUser" class="form">
                <div class="flex">
                    Роль:
                    <select class="form-select pb-1 pt-1" v-model="updateUser.role">
                        <option value="observer">observer</option>
                        <option value="worker" selected>worker</option>
                        <option value="admin">admin</option>
                    </select>

                    Цена:
                    <input type="text" v-model="updateUser.price">
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
import ProjectTaskCard from "@/components/ProjectTaskCard.vue";
// import service from "@/service";

export default {
    name: "ProjectView",

    components: {
        draggable: vuedraggable,
        ProjectTaskCard: ProjectTaskCard,
    },

    mounted() {
        this.getProject();
    },

    data: function () {
        return {
            modals: {
                timer: false,
                newUser: false,
                updateUser: false
            },
            timing_user: null,
            project: {},
            newTask: {},
            newUser: {},
            updateUser: {},
            newComment: {},
            loading: {
                project: true
            },

            myArray: [],
            drag: false,
            timings: [],
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

        getUserPrice(id){
          let projectUser = this.project.users.find(user => user.id == id);
          let price = 0;
          if (projectUser == undefined) {
            return 0
          }
          if (projectUser.pivot) {
            price = projectUser.pivot.price
          } else {
            price = projectUser.price
          }
          return price
        },

        getTimeOfStatus(status_id) {
            let tasks = this.project.tasks.filter(t => t.status_id === status_id && t.task_id === this.project.current_task_id)

            let time = 0;
            let totalPrice = 0;

            tasks.forEach(t => {

                t.timings.forEach(timing => {
                  time += timing.time;
                  totalPrice += this.getUserPrice(timing.user.id) * (timing.time / 3600)
                })

            })

            totalPrice = totalPrice.toFixed(1)

          // totalPrice = Math.floor(totalPrice)
            return {
                time,
                totalPrice
            };

        },

        updateTiming(timing) {
            timing.start = `${timing.startDate} ${timing.startTime}`;
            timing.end = `${timing.endDate} ${timing.endTime}`;
            api.timer.updateTiming(timing.id, timing.start, timing.end).then(response => {
                useToast().success('Обновлено')
                let ti = this.timings.findIndex(el => el.id === timing.id)
                // console.log(ti)
                // console.log(this.timings[ti])
                this.timings[ti] = response.data
            }).catch(() => {
                useToast().error('Ошибка')
            })
        },
        deleteTiming(id) {
            api.task.deleteTiming(id).then(response => {
                this.timings = this.timings.filter(el => el.id != id)
            }).catch(() => {
                useToast().error('Ошибка удаления')
            })
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
        saveUpdateUser() {
            api.project.updateUser(this.project.id, this.updateUser.id, this.updateUser.role, this.updateUser.price ).then(response => {
                if (response.data) {
                    this.modals.updateUser = false
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
          console.log(user)
            this.updateUser = user
            this.updateUser.role = user.pivot.role
            this.updateUser.price = this.getUserPrice(user.id)
            this.modals.updateUser = true
        },

        openTimer(task, time) {
            this.modals.timer = true;
            this.currentTimer.task_id = task.id
            this.currentTimer.time = time
            this.timings = task.timings
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


            if (this.timing_user == null){
              this.timing_user = localStorage.getItem('userId')
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
                                    task.time = parseInt(task.time) + (this.timer.actualSec)
                                }
                            }
                        }

                        this.project.time += (this.timer.actualSec);
                    }
                }

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
                this.project.current_task = response.data.task
                this.project.tasks = response.data.tasks
                this.setTitle(this.title + ' - ' + this.project.current_task.name)
                document.location.hash
            }).catch(error => {
                console.log(error)
                useToast().error('Ошибка получения задачи')
            });
        },

        createTask(e, id = null) {
            console.log('create task')
            if (!this.newTask.name) {
                return
            }
            if (id) {
                this.newTask.task_id = id

            } else if (this.project.current_task) {
                this.newTask.task_id = this.project.current_task.id
            }
            this.newTask.status_id = e.target.elements['status']._value
            this.newTask.project_id = this.project.id
            api.task.create(this.newTask).then(response => {
                console.log(response.data)
                let task = response.data
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

        stopTimer() {
            api.timer.stop().then(response => {
                useToast().success('остановлено')
                let needed_task_id = this.timer.task_id;
                let task = this.project.tasks.find(t => t.id === needed_task_id)


                response.data.timing.end =  new Date(response.data.timing.end).toISOString().replace('T', ' ').substring(0, 19);
                task.timings.push(response.data.timing)
                while (needed_task_id) {
                    task = this.project.tasks.find(t => t.id === needed_task_id)
                    console.log(task)
                    task.time += this.timer.actualSec
                    needed_task_id = task.task_id
                }
                this.project.time += this.timer.actualSec
                this.setTimer(response.data.timer)

            }).catch(error => {
                console.log(error)
                useToast().error('Ошибка')
            });
        },

        openPreview(id) {
            if (!this.preview || this.previewTask.id == id)
                this.preview = !this.preview
            if (this.preview) {
                let parent_task_id = this.project.id
                this.loadPreview(id)
            }
        },
        loadPreview(id) {

            this.previewTask = this.project.tasks.find(t => t.id === id)
            api.comments.getByTask(id).then(response => {
                this.previewTask.comments = response.data
            }).catch(error => {
                useToast().error('Ошибка получения комментов')
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
                this.loadPreview(this.previewTask.id)
                this.newComment = {text: ''}
            }).catch((errors) => {
                console.log(errors)
            })
        },
        deleteComment(id) {
            api.comments.delete(id).then((response) => {
                this.loadPreview(this.previewTask.id)
            }).catch((errors) => {
                console.log(errors)
            })
        }
    },

    computed: {
        ...mapGetters({
            timer: 'getTimer',
            title: 'getTitle',
            userId: 'getUserId',
        }),
        formattedTimings() {
            if(!this.timings){
                return []
            }
            return this.timings.map(timing => {
                if (timing.start && timing.end) {
                    const startDate = timing.start.split(' ')[0];
                    const startTime = timing.start.split(' ')[1].slice(0, 5);
                    const endDate = timing.end.split(' ')[0];
                    console.log(timing.end.split(' '))
                    const endTime = timing.end.split(' ')[1].slice(0, 5);

                    return {
                        ...timing,
                        startDate,
                        startTime,
                        endDate,
                        endTime
                    };
                } else {
                    const startDate = ''
                    const startTime = ''
                    const endDate = ''
                    const endTime = ''

                    return {
                        ...timing,
                        startDate,
                        startTime,
                        endDate,
                        endTime
                    };
                }
            });
        }
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
                            // let task = null;
                            // if (this.project.tasks) {
                            //     task = this.project.tasks.find(el => el.id == this.timer.task_id);
                            //
                            // }
                            // if (!task && this.previewTask && this.previewTask.tasks){
                            //     task = this.previewTask.tasks.find(el => el.id == this.timer.task_id);
                            //
                            // }
                            // if (task) {
                            //     task.time++
                            // }
                        }
                        // this.project.time++;
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
