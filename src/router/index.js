import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'
import RegisterView from '@/views/Auth/RegisterView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import DashboardView from '@/views/Students/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { auth: true }
    },

  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  await authStore.fetchUser();


  if (to.meta.auth && !authStore.user) {
    return { name: 'login' }
  }

  if (to.meta.guest && authStore.user) {
    return { name: 'dashboard' }
  }

})

export default router
