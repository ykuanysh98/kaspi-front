<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useUserStore } from '~/entities/user'
import { Table } from '~/shared/ui/table'

const userStore = useUserStore()
const users = computed(() => userStore.usersList)

onMounted(async () => {
  try {
    await userStore.fetchUsersList()
  } catch {
    alert('❌ Клиенттерді жүктеу мүмкін болмады')
  }
})
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">👥 Клиенты</h1>

    <Table>
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
          class="hover:bg-blue-50 transition duration-200">
          <td class="px-6 py-4 text-gray-700">{{ user.id }}</td>
          <td class="px-6 py-4 font-medium text-gray-800">{{ user.name }}</td>
          <td class="px-6 py-4 text-gray-700">{{ user.email }}</td>
          <td class="px-6 py-4 capitalize text-gray-600">{{ user.role }}</td>
        </tr>
      </tbody>
    </Table>
  </div>
</template>
