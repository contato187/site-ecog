import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Isso diz ao sistema que o símbolo "@" significa a pasta principal
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    // Garante que o site seja gerado na pasta correta para a Vercel
    outDir: 'dist',
  },
  server: {
    port: 3000,
  }
});
