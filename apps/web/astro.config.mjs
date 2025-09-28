// @ts-check
import preact from '@astrojs/preact'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://pucodev.github.io',
  base: '/omlg',
  build: {
    assets: 'assets',
  },
  integrations: [preact()],
})
