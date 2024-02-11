import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
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
  define: {
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(new Date().toISOString()),
  },
});
