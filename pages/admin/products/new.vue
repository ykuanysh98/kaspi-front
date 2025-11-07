<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'

const { post } = useApi()
const router = useRouter()

const name = ref('')
const price = ref('')
const quantity = ref('')
const description = ref('')
const images = ref([])
const previewImages = ref([])

function handleFileChange(e) {
  images.value = Array.from(e.target.files)
  previewImages.value = images.value.map(f => URL.createObjectURL(f))
}

async function submit() {
  try {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('price', price.value)
      formData.append('quantity', quantity.value)
      formData.append('description', description.value)

      images.value.forEach(file => {
        formData.append('images[]', file, file.name)
      })

      await post('/admin/products', formData)

      router.push('/admin')
  } catch (err) {
    console.error('❌ Қате:', err)
    alert('Қате шықты, қайта көріңіз!')
  }
}
</script>

<template>
  <div class="p-6 max-w-xl mx-auto bg-white rounded-lg shadow">
    <h1 class="text-xl font-bold mb-4">🆕 Жаңа өнім қосу</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="name" type="text" placeholder="Өнім атауы" class="input" required />
      <input v-model="price" type="number" placeholder="Бағасы" class="input" required />
      <input v-model="quantity" type="number" placeholder="Саны" class="input" required />
      <textarea v-model="description" placeholder="Сипаттама" class="input"></textarea>

      <div>
        <label class="block text-sm font-medium mb-1">Суреттер</label>
        <input type="file" multiple @change="handleFileChange" class="block w-full" />
      </div>

      <!-- алдын ала сурет көрсету -->
      <div v-if="previewImages.length" class="flex flex-wrap gap-2 mt-2">
        <img
          v-for="(img, i) in previewImages"
          :key="i"
          :src="img"
          class="w-24 h-24 object-cover rounded border"
        />
      </div>

      <button class="btn-primary w-full mt-4">Сақтау</button>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-lg p-2;
}
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold;
}
</style>
