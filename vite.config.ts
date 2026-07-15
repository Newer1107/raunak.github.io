import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  server: {
    host: '::',
    port: 8080,
    allowedHosts: ['raunaktech.site'],
    hmr: {
      overlay: false,
    },
  },

  preview: {
    host: '::',
    port: 8080,
    allowedHosts: ['raunaktech.site'],
  },

  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
