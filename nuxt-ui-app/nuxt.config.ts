// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/image", "@vite-pwa/nuxt"],
  css: ["~/assets/css/app.scss"],
  pwa: {
    manifest: { theme_color: "#021943" },
  },
});
