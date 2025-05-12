// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '../router'
import api from '@/services/api'
import { nextTick } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<any>(null)
  const hydrated = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  async function login(email: string, password: string) {
  try {
    const res = await api.post('/auth/login', { email, password })
    setToken(res.data.token)

    await nextTick()            // garante que token esteja reativo
    await fetchProfile()        // obtém perfil
    await router.isReady()      // garante que router esteja 100%
    await router.push('/dashboard') // navega com segurança
  } catch (err: any) {
    throw new Error(err.response?.data?.error || 'Credenciais inválidas')
  }
}

  async function fetchProfile() {
    try {
      if (!token.value) return
      const res = await api.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      user.value = res.data
    } catch (err: any) {
      console.error('Erro ao carregar perfil:', err)
      logout()
    } finally {
      hydrated.value = true
    }
  }

  function logout() {
    token.value = ''
    user.value = null
    hydrated.value = true
    localStorage.removeItem('token')
    router.push('/login')
  }

  // Inicializa a store ao carregar o app
  async function initialize() {
    if (token.value) {
      await fetchProfile()
    } else {
      hydrated.value = true
    }
  }

  return {
    token,
    user,
    hydrated,
    isAuthenticated,
    login,
    logout,
    fetchProfile,
    initialize,
    setToken
  }
})
