import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '../views/Login.vue'
import BaseLayout from '../layouts/BaseLayout.vue'
import Projects from '../views/Projects.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/',
      name: "base",
      component: BaseLayout,
      children: [
        {
          path: 'projects/',
          name: 'projects',
          component: Projects
        }
      ]
    }
  ]
})

export default router
