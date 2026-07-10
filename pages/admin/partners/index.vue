<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/shared/api'
import { useRouter } from 'vue-router'

const { get } = useApi()
const partners = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    partners.value = await get('/admin/partners')
  } catch (e) {
    console.error(e)
    alert('❌ Сатушылар тізімін жүктеу мүмкін болмады')
  }
})
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <div class="flex gap-3">
      <h1 class="text-2xl font-bold mb-4">🏬 Продавцы</h1>
      <button
        @click="router.push('/admin/partners/create')"
        class="btn-primary">
        + Жаңа Продавцы
      </button>
    </div>

    <table class="min-w-full border rounded-lg overflow-hidden shadow">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Аты</th>
          <th class="px-4 py-2 border">Мекен-жайы</th>
          <th class="px-4 py-2 border">Заказдары</th>
          <th class="px-4 py-2 border">Табысы</th>
          <th class="px-4 py-2 border">Рейтинг</th>
          <th class="px-4 py-2 border">Отзыв саны</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="partner in partners"
          :key="partner.id"
          class="border-b hover:bg-gray-50 transition">
          <td class="px-4 py-2">{{ partner.id }}</td>

          <td
            class="px-4 py-2 font-medium"
            @click="router.push(`/admin/partners/${partner.id}`)">
            {{ partner.company_name || "—" }}
          </td>

          <td class="px-4 py-2">
            {{ partner.address || "—" }}
          </td>

          <td class="px-4 py-2">
            {{ partner.orders?.length ?? 0 }}
          </td>

          <td class="px-4 py-2 font-semibold">
            {{ partner.total_sales?.toLocaleString() ?? 0 }} ₸
          </td>

          <td class="px-4 py-2">
            ⭐ {{ partner.rating ?? 0 }}
          </td>

          <td class="px-4 py-2">
            {{ partner.reviews_count ?? 0 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
