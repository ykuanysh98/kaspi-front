<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Клиенты</h1>

    <table class="min-w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Аты</th>
          <th class="px-4 py-2 border">Почта</th>
          <th class="px-4 py-2 border">Роль</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
          <td class="px-4 py-2">{{ user.id }}</td>
          <td class="px-4 py-2">{{ user.name }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'

const { get } = useApi()
const users = ref([])

onMounted(async () => {
  users.value = await get('/users')
})
</script>
