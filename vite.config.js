import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import image from '@rollup/plugin-image';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.PNG','**/*.png','**/*.MOV', '**/*.mov' ],
  plugins: [react(), image()],
})
