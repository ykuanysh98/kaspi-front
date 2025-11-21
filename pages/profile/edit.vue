<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'

const { get, post } = useApi()
const userStore = useUserStore()
const router = useRouter()

const form = ref({ name: '', email: '' })

onMounted(async () => {
  form.value.name = userStore.user.name
  form.value.email = userStore.user.email
})

const save = async () => {
  try {
    await post('/user', form.value)
    const res = await get('/user')
    userStore.setUser(res)
    router.push('/profile')
  } catch (err) {
    console.error(err)
    alert('❌ Қате шықты, қайта көріңіз')
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
    <h1 class="text-2xl font-bold mb-6">Профильді өзгерту</h1>

    <div class="flex flex-col gap-4">
      <input 
        v-model="form.name" 
        type="text" 
        placeholder="Аты" 
        class="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />
      <input 
        v-model="form.email" 
        type="email" 
        placeholder="Email" 
        class="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />

      <button 
        @click="save" 
        class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Сақтау
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Барлығы Tailwind арқылы жасалған, қосымша CSS қажет емес */
</style>
