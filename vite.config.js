import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

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
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        proof: fileURLToPath(new URL('./proof/index.html', import.meta.url)),
      },
    },
  },
})
