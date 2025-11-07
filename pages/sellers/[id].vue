<template>
  <div class="max-w-5xl mx-auto p-8">
    <div v-if="partner" class="mb-8">
      <h1 class="text-3xl font-bold mb-1">{{ partner.company_name }} дүкені</h1>
      <p class="text-gray-600">{{ partner.email }}</p>
    </div>

    <h2 class="text-2xl font-semibold mb-4">Өнімдері</h2>

    <div
      v-if="partner && partner.products?.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <Product v-for="p in partner.products" :key="p.id"  :p="p" />
    </div>

    <div v-else class="text-gray-500">Бұл сатушыда өнім жоқ</div>
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
    const data  = await get(`/users/${route.params.id}`)
    partner.value = data
  } catch (e) {
    console.error(e)
  }
})
</script>
