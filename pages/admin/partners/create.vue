<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

const { post } = useApi()

const form = ref({
  company_name: '',
  email: '',
  phone: '',
  address: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref('')

const submit = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    await post('/partners', form.value)
    success.value = true
    form.value = { company_name: '', email: '', phone: '', address: '' }
  } catch (e) {
    error.value = 'Қате кетті. Сервер жағын тексеріңіз.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
    <h1 class="text-2xl font-bold mb-6">Сатушы қосу</h1>

    <div v-if="success" class="mb-4 text-green-600 font-medium">Сатушы сәтті қосылды ✅</div>
    <div v-if="error" class="mb-4 text-red-600 font-medium">{{ error }}</div>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Атауы</label>
        <input
          v-model="form.company_name"
          type="text"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Компания атауы"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Телефон</label>
        <input
          v-model="form.phone"
          type="text"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="+7 700 000 0000"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Мекенжай</label>
        <textarea
          v-model="form.address"
          rows="2"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Қала, көше, ғимарат"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        :disabled="loading"
      >
        {{ loading ? 'Жіберілуде...' : 'Қосу' }}
      </button>
    </form>
  </div>
</template>
