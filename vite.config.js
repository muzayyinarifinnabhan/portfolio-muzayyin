import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          ai: ['@google/generative-ai'],
          icons: ['react-icons'],
          particles: ['react-tsparticles', 'tsparticles-slim'],
        },
      },
    },
  },
})
