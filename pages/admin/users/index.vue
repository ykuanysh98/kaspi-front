<script setup>
import { ref, onMounted, watch } from 'vue'
import { useApi } from '@/composables/useApi'
const { get, del } = useApi()

const users = ref([])
const sort = ref('id') // 🔹 жаңа — сұрыптау параметрі

const fetchUsers = async () => {
  users.value = await get(`/admin/users?sort=${sort.value}`)
}

onMounted(fetchUsers)
watch(sort, fetchUsers) // 🔹 сұрыптау өзгергенде қайта жүктеу
 
const remove = async (id) => {
  if (confirm('Жоюға сенімдісің бе?')) {
    await del(`/admin/users/${id}`)
    users.value = users.value.filter(u => u.id !== id)
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">👥 Қолданушылар</h1>
      <select v-model="sort" class="border rounded px-2 py-1">
        <option value="id">По умолчение</option>
        <option value="sum_max">Суммасы ең көп</option>
        <option value="sum_min">Суммасы ең аз</option>
      </select>
      <NuxtLink to="/admin/users/create" class="bg-blue-600 text-white px-4 py-2 rounded">➕ Қосу</NuxtLink>
    </div>

    <table class="w-full border">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Аты</th>
          <th class="p-2 border">Email</th>
          <th class="p-2 border">Роли</th>
          <th class="p-2 border">Сумма заказа</th>
          <th class="p-2 border text-center">Әрекет</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id" class="hover:bg-gray-50">
          <td class="p-2 border">{{ u.id }}</td>
          <td class="p-2 border">{{ u.name }}</td>
          <td class="p-2 border">{{ u.email }}</td>
          <td class="p-2 border">{{ u.role }}</td>
          <td class="p-2 border">{{ u.total_orders_sum || 0 }}</td>
          <td class="p-2 border text-center">
            <NuxtLink :to="`/admin/users/${u.id}`" class="text-blue-600 underline mr-2">Көру</NuxtLink>
            <button @click="remove(u.id)" class="text-red-600 hover:underline">Жою</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
