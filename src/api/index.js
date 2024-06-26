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

        get(id, timing_user = null, parent_task_id = null) {
            return axios.get('/project', {
                params: {
                    id: id,
                    parent_task_id: parent_task_id,
                    timing_user: timing_user
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

        updateUser(project_id, user_id, role, price) {
            return axios.put('/project/managerUser', {
                project_id,
                user_id,
                role,
                price
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

        getTimings(id, timing_user = null) {
            return axios.get('/task/timing', {
                params: {
                    id, timing_user
                }
            })
        },

        deleteTiming(id) {
            return axios.delete('/task/timing', {
                data: {
                    id
                }
            })
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

        updateTiming(id, start, end) {
            return axios.put('timer/timing', {
                id, start, end
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
        },

        updateMe(user) {
            return axios.put('/me', user);
        }
    },

    comments: {
        create(task_id, content) {
            return axios.post('comments', {
                task_id, content
            })
        },
        update(id, content) {

            return axios.put('comments', {
                id, content
            })
        },
        delete(id) {
            return axios.delete('comments', {
                data: {
                    id
                }
            })
        },

        getByTask(id) {
            return axios.get('comments/byTask', {
                params: {
                    id
                }
            })
        }
    }
}






