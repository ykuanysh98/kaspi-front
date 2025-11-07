<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'

const { post } = useApi()
const router = useRouter()
const form = ref({ name: '', email: '', password: '' })

const save = async () => {
  await post('/admin/users', form.value)
  alert('✅ Қолданушы қосылды')
  router.push('/admin/users')
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-4">Жаңа қолданушы қосу</h1>

    <div class="flex flex-col gap-4">
      <input v-model="form.name" placeholder="Аты" class="border p-2 rounded" />
      <input v-model="form.email" type="email" placeholder="Email" class="border p-2 rounded" />
      <input v-model="form.password" type="password" placeholder="Құпия сөз" class="border p-2 rounded" />

      <button @click="save" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Қосу
      </button>
    </div>
  </div>
</template>
