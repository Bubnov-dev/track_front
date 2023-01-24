<template>
    <div class="project">
        <div class="project__loading" v-if="loading.project">
            loading...
        </div>
        <div class="project__content" v-else>
            <h2>Project: {{ project.name }}</h2>

            <div class="project__statuses">
                <div class="project__status" v-for="status in project.statuses" :key="status.id">
                    <h3>status: {{ status.name }}</h3>
                    <div class="project__tasks">
                        <div class="project__task card"
                             v-for="task in project.tasks.filter(t => t.status_id == status.id)" :key="task.id">
                            {{ task.name }}
                        </div>

                        <div class="card">
                            <form @submit.prevent="createTask">
                                <input type="text" placeholder="Новая задача" v-model="newTask.name">
                                <input type="hidden" :value="status.id">
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

export default {
    name: "ProjectView",

    mounted() {
        api.project.get(this.$route.params.id).then((response) => {
            console.log(response.data)
            this.project = response.data
            this.loading.project = false
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
        createTask() {
            this.newTask.project_id = this.project.id
            api.task.create(this.newTask).then(response => {
                console.log(response.data)
            }).catch(error=>{
                console.log(error)
            })
        }
    }
}
</script>
