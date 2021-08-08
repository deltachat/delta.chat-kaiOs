import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import remarkHtml from 'vite-remark-html'
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    remarkHtml(),
    checker({ typescript: true }),
    legacy({
      targets: ['defaults', 'IE 11', 'firefox 37'],
    })
  ],
  base: "./"
})
