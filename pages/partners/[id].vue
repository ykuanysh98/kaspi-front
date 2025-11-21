<template>
  <div class="max-w-5xl mx-auto p-8">
    <!-- Партнер туралы ақпарат -->
    <div v-if="partner" class="mb-8 bg-white p-6 rounded-lg shadow">
      <h1 class="text-3xl font-bold mb-1 text-gray-800">{{ partner.company_name }} дүкені</h1>
      <p class="text-gray-600">{{ partner.email }}</p>
    </div>

    <!-- Өнімдер -->
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">🛍️ Өнімдері</h2>

    <div v-if="partner && partner.products?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Product v-for="p in partner.products" :key="p.id" :p="p" />
    </div>

    <div v-else class="text-gray-500 text-center py-10">
      Бұл сатушыда өнім жоқ 😕
    </div>

    <!-- Пікірлер -->
    <Review />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/useApi'

const { get } = useApi()
const route = useRoute()
const partner = ref(null)

onMounted(async () => {
  try {
    const data = await get(`/partners/${route.params.id}`)
    partner.value = data
  } catch (e) {
    console.error('Сатушыны жүктеу қатесі:', e)
  }
})
</script>

<style scoped>
/* Shadow және padding стильдері арқылы заманауи look берілді */
</style>
