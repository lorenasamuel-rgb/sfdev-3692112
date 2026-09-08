import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const appRoot = fileURLToPath(new URL('.', import.meta.url))
const archiveImages = path.resolve(appRoot, '../../datasets/fictional-film-archive/images')

function archivePosters() {
  return {
    name: 'archive-posters',
    configureServer(server) {
      server.middlewares.use('/images', (req, res, next) => {
        const fileName = path.basename((req.url ?? '').split('?')[0])
        const file = path.join(archiveImages, fileName)
        if (!file.startsWith(archiveImages) || !fs.existsSync(file)) {
          next()
          return
        }
        res.setHeader('Content-Type', 'image/svg+xml')
        fs.createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      const out = path.join(appRoot, 'dist/images')
      fs.mkdirSync(out, { recursive: true })
      for (const name of fs.readdirSync(archiveImages)) {
        fs.copyFileSync(path.join(archiveImages, name), path.join(out, name))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), archivePosters()],
})
