// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  plugins: ["~/plugins/ku-ui-kit.js"],
  typescript: {
    // strict: true,
    // typeCheck: true
  },
  components: [
    { path: "~/components", pathPrefix: true },
    { path: "~/shared/ui", prefix: "App" },
    { path: "~/entities", pathPrefix: false },
    { path: "~/features", pathPrefix: false },
    { path: "~/widgets", prefix: "Widget" },
  ],
});
