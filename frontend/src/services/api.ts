import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const api = axios.create({
  baseURL: '/v1'
})

// Intercepta requisições e insere o token
api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  const token = auth.token || localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
