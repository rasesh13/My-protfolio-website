import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-http': ['axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  define: {
    'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV || 'production')
  }
})
