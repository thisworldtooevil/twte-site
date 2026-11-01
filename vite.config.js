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
    // Three real HTML entries. /proof/ and /media/ build to
    // dist/<page>/index.html, so GitHub Pages serves each one directly on a
    // hard refresh or a direct link, with no SPA 404 fallback.
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        proof: fileURLToPath(new URL('./proof/index.html', import.meta.url)),
        media: fileURLToPath(new URL('./media/index.html', import.meta.url)),
      },
    },
  },
})
