// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/image"],
  css: ["~/assets/css/app.scss"],
  app: {
    head: {
      meta: [{ name: "theme-color", content: "#021943" }],
      link: [{ rel: "manifest", href: "/manifest.webmanifest" }],
    },
  },
});
