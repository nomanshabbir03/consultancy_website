import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Same-origin /api in development too (matches Vercel services routing).
    proxy: { '/api': 'http://localhost:5000' },
  },
});
