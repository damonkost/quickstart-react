import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './certs/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs/cert.pem'))
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
        sourcemapPathTransform: (relativeSourcePath) => {
          // Filter out problematic protocols
          const invalidProtocols = ['chrome-error:', 'chrome://', 'chrome-extension://'];
          if (invalidProtocols.some(protocol => relativeSourcePath.startsWith(protocol))) {
            return null;
          }
          // Normalize path for Windows
          return path.normalize(relativeSourcePath);
        },
        // Exclude problematic source maps
        sourcemapIgnoreList: (relativeSourcePath) => {
          return relativeSourcePath.includes('chrome-error') || 
                 relativeSourcePath.includes('neterror');
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
