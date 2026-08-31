import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config — CSS Modules (*.module.css) work out of the box.
export default defineConfig({
  plugins: [react()],
});
