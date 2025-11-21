<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-6">👤 Менің профилім</h1>

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
