// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore"],
  },
  imports: {
    dirs:["./stores"]
  },
  resolve: {
    alias: 
      [{ find: "@", replacement: resolve(__dirname, "./src") }]
  },
  
});
