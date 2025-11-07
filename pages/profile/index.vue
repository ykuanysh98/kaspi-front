<script setup>
import { ref, onMounted } from 'vue'
// import { useApi } from '@/composables/useApi'
import { useUserStore } from '~/stores/user'

const user = ref(null)
// const { get } = useApi()
const userStore = useUserStore()

onMounted(async () => {
  // const res = await get('/user')
  // userStore.setUser(res)
})
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-4">👤 Менің профилім</h1>
    <div v-if="userStore.user">
      <p><strong>Аты:</strong> {{ userStore.user.name }}</p>
      <p><strong>Email:</strong> {{ userStore.user.email }}</p>
      <NuxtLink to="/profile/edit" class="text-blue-600 underline mt-4 inline-block">Өзгерту</NuxtLink>
    </div>
  </div>
</template>
