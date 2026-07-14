// middleware/auth.global.js
export default defineNuxtRouteMiddleware((to) => {
  // Кукилерден токендерді алу
  const token = useCookie('token-kaspi').value
  const adminToken = useCookie('token-kaspi-admin').value

  // 🟦 Егер admin беті болса
  if (to.path.startsWith('/admin')) {
    // Токен жоқ болса → /admin/login
    if (!adminToken && to.path !== '/admin/login' && to.path !== '/admin/register') {
      return navigateTo('/admin/login')
    }
  }
  // 🟩 Қарапайым қолданушы беті болса
  else {
    // Токен жоқ болса → /login
    if (!token && to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login')
    }
  }
})
