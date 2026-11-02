import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { readdirSync, existsSync, statSync } from 'node:fs'

const root = (p) => fileURLToPath(new URL(p, import.meta.url))
const SITE = 'https://thisworldtooevil.com'
const OG_IMAGE = `${SITE}/images/og-image.png`

// Industry pages: one content file in src/industries/<slug>.js plus one page
// entry at <slug>/index.html. Every slug with both is built automatically.
const industrySlugs = readdirSync(root('./src/industries'))
  .filter((f) => f.endsWith('.js'))
  .map((f) => f.slice(0, -3))
  .filter((slug) => existsSync(root(`./${slug}/index.html`)))

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Writes each industry page's <title>, description and share tags from its
// content file into the <!-- industry-head --> slot of its page entry, so link
// previews and search engines see them without running any JavaScript.
function industryHead() {
  return {
    name: 'industry-head',
    // 'pre': read the page entry before Vite bundles its inline import away.
    transformIndexHtml: { order: 'pre', handler: async (html) => {
      const m = html.match(/\/src\/industries\/([\w-]+)\.js/)
      if (!m || !html.includes('<!-- industry-head')) return html
      const file = root(`./src/industries/${m[1]}.js`)
      const { page } = await import(`${pathToFileURL(file).href}?v=${statSync(file).mtimeMs}`)
      const url = `${SITE}/${page.slug}/`
      const tags = [
        `<title>${esc(page.title)}</title>`,
        `<meta name="description" content="${esc(page.description)}">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:url" content="${url}">`,
        `<meta property="og:title" content="${esc(page.title)}">`,
        `<meta property="og:description" content="${esc(page.shareDescription)}">`,
        `<meta property="og:image" content="${OG_IMAGE}">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${esc(page.title)}">`,
        `<meta name="twitter:description" content="${esc(page.shareDescription)}">`,
        `<meta name="twitter:image" content="${OG_IMAGE}">`,
      ].join('\n')
      return html.replace(/<!-- industry-head[^>]*-->/, tags)
    } },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), industryHead()],
  base: '/',
  build: {
    // Explicit: matches Vite's default. No production source maps, so the
    // minified bundle can't be un-minified back to readable source.
    sourcemap: false,
    // Real HTML entries. /proof/ and each industry page build to
    // dist/<page>/index.html, so GitHub Pages serves each one directly on a
    // hard refresh or a direct link, with no SPA 404 fallback. The old /media/
    // address is a static redirect in public/media/.
    rollupOptions: {
      input: {
        main: root('./index.html'),
        proof: root('./proof/index.html'),
        ...Object.fromEntries(industrySlugs.map((slug) => [slug, root(`./${slug}/index.html`)])),
      },
    },
  },
})
