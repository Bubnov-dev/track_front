import axios from "axios"
import {mapGetters, mapActions} from "vuex";

axios.defaults.baseURL = 'https://nowtime-back.ffox.site/api';
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
// axios.defaults.headers.common['Authorization'] = 'Bearer 1|VeZIwdWDAeGQehhQQKPGzTv7fNmTVxzIoCsmKOry';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    setApiToken(token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    },

    removeApiToken() {
        axios.defaults.headers.common['Authorization'] = '';
    },

    getTimer() {
        return axios.get('/timer');
    },

    project: {

        create(project) {
            return axios.post('/project', project);
        },

        update(project) {
            return axios.update('/project', project);
        },

        get(id, parent_task_id = null) {
            return axios.get('/project', {
                params: {
                    id: id,
                    parent_task_id
                }
            });
        },

        getList() {
            return axios.get('/project/list');
        },

        my() {
            return axios.get('/project/my');
        },

        delete(id) {
            return axios.delete('/project', {
                data: {

                    id: id
                }

            });
        },


        inviteUser(project_id, email, role) {
            return axios.post('/project/managerUser', {
                project_id,
                email,
                role
            });
        },

        removeUser(project_id, user_id) {
            return axios.delete('/project/managerUser', {
                data: {

                    project_id,
                    user_id
                }

            });
        },

        updateUser(project_id, user_id, role) {
            return axios.put('/project/managerUser', {
                project_id,
                user_id,
                role
            });
        }

    },

    task: {
        create(task) {
            return axios.post('/task', task);
        },

        update(task) {
            return axios.put('/task', task);
        },

        rename(id, name) {
            return axios.put('/task/name', {
                id, name
            })
        },

        get(id) {
            return axios.get('/task', {
                params: {
                    id: id
                }
            });
        },

        delete(id) {
            return axios.delete('/task', {
                data: {
                    id: id
                }

            });
        },


        inviteUser(id, user_id) {
            return axios.post('/managerUser', {
                id,
                user_id,
            });
        },

        removeUser(id, user_id) {
            return axios.delete('/managerUser', {
                id,
                user_id,
            });
        },

        nextStatus(task_id) {
            return axios.post('task/nextStatus', {
                task_id
            });
        },

        changeStatus(task_id, status_id) {
            return axios.post('/task/changeStatus', {
                task_id,
                status_id
            });
        },

        startTimer(task_id) {
            return axios.post('task/startTimer', {
                'id': task_id
            })
        },

        stopTimer() {
            return axios.post('task/stopTimer');
        }


    },

    timer: {
        start(task_id, project_id = null) {
            return axios.post('/timer/start', {
                task_id, project_id
            });
        },

        stop() {
            return axios.post('/timer/stop');
        },

        updateTiming(timeToAppend, task_id, project_id = null) {
            return axios.post('timer/updateTiming', {
                timeToAppend,
                task_id,
                project_id
            })
        }
    },

    user: {
        register(user) {
            return axios.post('/register', user);
        },
        login(user) {
            return axios.post('/login', user);
        },

        me() {
            return axios.get('/me');
        }
    }
}






