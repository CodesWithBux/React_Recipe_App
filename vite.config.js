import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CSS Modules (*.module.css) work out of the box.
// base is '/' during dev (so `npm run dev` behaves normally) and the repo
// path in the production build, which GitHub Pages project sites require.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/React_Recipe_App/' : '/',
}));
