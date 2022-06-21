import axios from "axios"

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.common['Authorization'] = 'Bearer 1|VeZIwdWDAeGQehhQQKPGzTv7fNmTVxzIoCsmKOry';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    project: {

        create(project) {
            return axios.post('/project', project);
        },

        update(project) {
            return axios.update('/project', project);
        },

        get(id) {
            return axios.get('/project', {
                params: {
                    id: id
                }
            });
        },

        delete(id) {
            return axios.delete('/project', {
                id: id
            });
        },


        inviteUser(project_id, user_id, role) {
            return axios.post('/managerUser', {
                project_id,
                user_id,
                role
            });
        },

        removeUser(project_id, user_id) {
            return axios.delete('/managerUser', {
                project_id,
                user_id
            });
        },

        updateUser(project_id, user_id, role) {
            return axios.put('/managerUser', {
                project_id,
                user_id,
                role
            });
        }

    },

    task: {

    },

    user: {
        register(user) {
            return axios.post('/register', user);
        },
        login(user) {
            return axios.post('/login', user);
        }

    }
}






