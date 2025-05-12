import { defineStore } from 'pinia'
import api from '@/services/api'

export interface Client {
  _id?: string
  name: string
  phone: string
  email: string
  notes?: string
  createdAt?: string
}

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: [] as Client[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchClients() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/clients')
        this.clients = res.data
      } catch (err: any) {
        this.error = err.response?.data?.error || 'Erro ao buscar clientes'
      } finally {
        this.loading = false
      }
    },

    async createClient(client: Client) {
      this.loading = true
      try {
        const res = await api.post('/clients', client)
        this.clients.push(res.data) // Adiciona o cliente diretamente à lista
      } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Erro ao criar cliente')
      } finally {
        this.loading = false
      }
    },

    async updateClient(id: string, client: Client) {
      this.loading = true
      try {
        const res = await api.put(`/clients/${id}`, client)
        const index = this.clients.findIndex(c => c._id === id)
        if (index !== -1) {
          this.clients[index] = res.data // Atualiza o cliente na lista
        }
      } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Erro ao atualizar cliente')
      } finally {
        this.loading = false
      }
    },

    async deleteClient(id: string) {
      this.loading = true
      try {
        await api.delete(`/clients/${id}`)
        this.clients = this.clients.filter(c => c._id !== id) // Remove o cliente da lista local
      } catch (err: any) {
        throw new Error(err.response?.data?.error || 'Erro ao excluir cliente')
      } finally {
        this.loading = false
      }
    }
  }
})
