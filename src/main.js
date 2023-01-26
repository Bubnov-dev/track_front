import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "vue-toastification";
import { useToast } from "vue-toastification";

const options = {
    timeout: 5000
};

const app = createApp(App)

app.use(router)
app.use(store)
app.use(useToast)
app.use(Toast, options);

app.mount('#app')
