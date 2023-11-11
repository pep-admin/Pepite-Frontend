import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    BUILD_TIMESTAMP: new Date(),
  },
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@views': '/src/views',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
      '@hooks': '/src/hooks',
      '@api': '/src/api',
    },
  },
});
