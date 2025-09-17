import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'inject-devtools-script',
      transformIndexHtml(html) {
        if (process.env.NODE_ENV === 'development') {
          return html.replace('</head>', `<script src="http://localhost:8097"></script></head>`);
        }
        return html;
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
