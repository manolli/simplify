import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },   
  },
   server: {
       port: 5173,
       proxy: {
      '/v1/auth': {
        target: 'http://localhost:4000', // backend de auth
        changeOrigin: true,
        rewrite: path => path.replace(/^\/v1\/auth/, '/v1/auth'),
      },
      '/v1': {
        target: 'http://localhost:4100', // ou o endereço do backend no Docker
        changeOrigin: true
      }
    }
  }
})
