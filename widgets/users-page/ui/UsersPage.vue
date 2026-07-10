<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/shared/api'

const { get } = useApi()
const users = ref([])

onMounted(async () => {
  try {
    users.value = await get('/users')
  } catch (err) {
    console.error(err)
    alert('❌ Клиенттерді жүктеу мүмкін болмады')
  }
})
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">👥 Клиенты</h1>

    <div class="overflow-x-auto border rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Аты</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Почта</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Роль</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-blue-50 transition">
            <td class="px-6 py-4 text-gray-700">{{ user.id }}</td>
            <td class="px-6 py-4 font-medium text-gray-800">{{ user.name }}</td>
            <td class="px-6 py-4 text-gray-700">{{ user.email }}</td>
            <td class="px-6 py-4 capitalize text-gray-600">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Hover effect smoother */
tr:hover {
  transition: background-color 0.2s ease;
}
</style>
