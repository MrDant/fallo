// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: "light",
  },
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  css: ["~/assets/css/app.scss"],
  ui: {
    icons: ["svg-spinners", "heroicons"],
  },
  app: {
    head: {
      meta: [{ name: "theme-color", content: "#021943" }],
      link: [{ rel: "manifest", href: "/manifest.webmanifest" }],
      script: [{async: true, src:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6999497424970315", crossorigin:"anonymous"}]
    },
  },
});
