// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  css: ["~/assets/css/app.scss"],
  ui: {
    icons: ["svg-spinners", "heroicons"],
  },
  app: {
    head: {
      meta: [{ name: "theme-color", content: "#021943" }],
      link: [{ rel: "manifest", href: "/manifest.webmanifest" }],
    },
  },
});
