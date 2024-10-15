import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@organisms': path.resolve(__dirname, './src/components/organisms'),
      '@atoms': path.resolve(__dirname, './src/components/atoms'),
      '@hooks': path.resolve(__dirname, './src/helpers/hooks'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
