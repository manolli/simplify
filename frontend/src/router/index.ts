import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Clients from '../pages/Clients.vue'
import { useAuthStore } from '@/store/auth'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requiresAuth: true,
      title: 'Clientes',
      actionLabel: 'Novo Cliente'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🚧 Protege rotas e redireciona
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // aguarda hidratação se necessário
  if (!auth.hydrated) {
    await auth.initialize()
  }

  const isLoggedIn = !!auth.token

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  if (to.path === '/login' && isLoggedIn) {
    return next('/dashboard')
  }

  next()
})
export default router
