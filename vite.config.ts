import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'framer-motion',
            '@gsap/react',
            'three',
            '@react-three/fiber',
            '@react-three/drei'
          ]
        }
      }
    }
  },
  server: {
    port: 3000
  }
});