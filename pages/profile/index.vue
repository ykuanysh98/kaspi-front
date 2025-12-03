<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

// Админ екендігін анықтау
const isAdmin = computed(() => userStore.user?.role === 'admin')

// Логаут функциясы
const logout = () => {
  userStore.clearToken()
  clearCart()
  router.push('/login')
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-6">👤 Менің профилім</h1>

    <!-- Кнопкалар (жоғарыда) -->
    <div class="mb-6 flex gap-3">
      <!-- Админге ғана: Пользователи -->
      <NuxtLink
        v-if="isAdmin"
        to="/users"
        class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition"
      >
        Пользователи
      </NuxtLink>

      <!-- Шығу -->
      <button
        v-if="userStore.token"
        @click="logout"
        class="px-3 py-2 rounded-md text-red-600 font-medium hover:text-white hover:bg-red-600 transition"
      >
        Шығу
      </button>
    </div>

    <!-- Профиль -->
    <div v-if="userStore.user" class="space-y-2">
      <p><span class="font-semibold">Аты:</span> {{ userStore.user.name }}</p>
      <p><span class="font-semibold">Email:</span> {{ userStore.user.email }}</p>

      <NuxtLink
        to="/profile/edit"
        class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        Өзгерту
      </NuxtLink>
    </div>

    <div v-else class="text-gray-500">
      Профиль мәліметтері жүктелуде...
    </div>
  </div>
</template>

<style scoped>
/* Tailwind арқылы стиль толық қосылды, қосымша CSS қажет емес */
</style>
