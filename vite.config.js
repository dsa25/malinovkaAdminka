import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist"
  },
  server: {
    host: true,
    hmr: true,
    port: 3000
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  plugins: [vue()]
})
