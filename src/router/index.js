import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '../views/Login.vue'
import BaseLayout from '../layouts/BaseLayout.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectView from "../views/ProjectView.vue";
import ProfileView from "../views/ProfileView.vue";

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
          path: '/',
          name: 'projects',
          component: ProjectsView
        },
        {
          path: 'projects/:id',
          name: 'project',
          component: ProjectView
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView
        },

      ]
    }
  ]
})

export default router
