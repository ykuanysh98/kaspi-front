import KuUiKit from 'ku-ui-kit'
import 'ku-ui-kit/style.css'
// import 'ku-ui-kit/tokens.css'
import '~/assets/styles/my-brand-tokens.css' 

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(KuUiKit)
})