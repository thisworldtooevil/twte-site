import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Explicit: matches Vite's default. No production source maps, so the
    // minified bundle can't be un-minified back to readable source.
    sourcemap: false,
  },
})
