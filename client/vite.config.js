import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // three.js is lazy-loaded in its own chunk (HeroScene)
  build: { chunkSizeWarningLimit: 600 },
});
