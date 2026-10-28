import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Explicit: matches Vite's default. No production source maps, so the
    // minified bundle can't be un-minified back to readable source.
    sourcemap: false,
    // Two real HTML entries. /proof/ builds to dist/proof/index.html, so
    // GitHub Pages serves it directly on a hard refresh or a direct link.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        proof: resolve(import.meta.dirname, 'proof/index.html'),
      },
    },
  },
})
