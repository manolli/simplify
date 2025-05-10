import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<any>(null)

  async function login(email: string, password: string) {
    const res = await fetch('http://localhost:4000/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.token) {
      token.value = data.token
      localStorage.setItem('token', data.token)
      await fetchProfile()
      router.push('/dashboard')
    } else {
      throw new Error('Credenciais inválidas')
    }
  }

  async function fetchProfile() {
    const res = await fetch('http://localhost:4000/v1/auth/profile', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    user.value = await res.json()
  }

  function logout() {
    token.value = ''
    localStorage.removeItem('token')
    router.push('/login')
  }

  return { token, user, login, logout, fetchProfile }
})
