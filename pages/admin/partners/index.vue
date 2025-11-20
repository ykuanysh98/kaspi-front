<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Продавцы</h1>

    <div class="mb-4">
      <!-- <NuxtLink to="/admin/partners/new" class="bg-green-600 text-white px-4 py-2 rounded">➕ Жаңа сатушы</NuxtLink> -->
    </div>

    <table class="min-w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Аты</th>
          <th class="px-4 py-2 border">Мекен-жайы</th>
          <th class="px-4 py-2 border">Заказдары</th>
          <th class="px-4 py-2 border">Табысы</th>
          <th class="p-2">Рейтинг</th>
          <th class="p-2">Отзыв саны</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="partner in partners" :key="partner.id" class="border-b hover:bg-gray-50">
          <td class="px-4 py-2">{{ partner.id }}</td>
          <td class="px-4 py-2">{{ partner.company_name }}</td>
          <td class="px-4 py-2">{{ partner.address || '-' }}</td>
          <td class="px-4 py-2">{{ partner.orders.length }}</td>
          <td class="px-4 py-2">{{ partner.total_sales }} т</td>
          <td class="p-2">⭐ {{ partner.rating }}</td>
          <td class="p-2">{{ partner.reviews_count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'

const { get } = useApi()
const partners = ref([])

onMounted(async () => {
  partners.value = await get('/admin/partners')
})
</script>
