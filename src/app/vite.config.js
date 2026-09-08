import { cpSync, createReadStream, existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const appRoot = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(appRoot, '../..')
const archiveRoot = path.resolve(repoRoot, 'datasets/fictional-film-archive')
const archiveImages = path.join(archiveRoot, 'images')

function archiveImagesPlugin() {
  return {
    name: 'archive-images',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.startsWith('/archive-images/')) return next()
        const file = path.join(archiveImages, path.basename(url))
        if (!existsSync(file)) return next()
        res.setHeader('Content-Type', 'image/svg+xml')
        createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      const dest = path.join(appRoot, 'dist/archive-images')
      mkdirSync(dest, { recursive: true })
      cpSync(archiveImages, dest, { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), archiveImagesPlugin()],
  resolve: {
    alias: {
      '@archive': archiveRoot,
    },
  },
  server: {
    host: true,
    port: 7363,
    strictPort: true,
    fs: {
      allow: [appRoot, archiveRoot],
    },
  },
  preview: {
    host: true,
    port: 7364,
    strictPort: true,
  },
})
