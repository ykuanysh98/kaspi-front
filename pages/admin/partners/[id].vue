<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '@/composables/useApi'
const { get } = useApi()
const route = useRoute()
const partner = ref(null)

onMounted(async () => {
  partner.value = await get(`/admin/partners/${route.params.id}`)
})
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-4">Сатушы туралы ақпарат</h1>
    <div v-if="partner">
      <p><strong>ID:</strong> {{ partner.id }}</p>
      <p><strong>Аты:</strong> {{ partner.name }}</p>
      <p><strong>Email:</strong> {{ partner.email }}</p>
      <p><strong>Жасалған уақыты:</strong> {{ partner.created_at }}</p>
    </div>
  </div>
</template>
