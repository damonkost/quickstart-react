<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
>>>>>>> parent of 9bfc378 (Add TensorFlow Lite model loading and update Vite configuration for React refresh)

export default defineConfig({
  plugins: [react()],
  build: {
<<<<<<< HEAD
    outDir: 'dist',
    sourcemap: true, // Enable source maps for debugging
=======
    outDir: './dist',
    sourcemap: true,
>>>>>>> parent of 9bfc378 (Add TensorFlow Lite model loading and update Vite configuration for React refresh)
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
<<<<<<< HEAD
    port: 3000,
    host: true
  }
});
=======
    port: 3000
  },
  base: './'
})
>>>>>>> parent of 9bfc378 (Add TensorFlow Lite model loading and update Vite configuration for React refresh)
