import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Clients from '../pages/Clients.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  {
  path: '/clients',
  name: 'Clients',
  component: Clients,
  meta: {
    title: 'Clientes',
    actionLabel: 'Novo Cliente'
  }
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router