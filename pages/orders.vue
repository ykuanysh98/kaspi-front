<template>
  <div class="p-8 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">📝 Менің тапсырыстарым</h1>

    <div v-if="orders.length === 0" class="text-gray-600">
      Сізде тапсырыс жоқ 😕
    </div>

    <div v-else>
      <div
        v-for="order in orders"
        :key="order.id"
        class="border rounded p-4 mb-4 shadow bg-white"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">Тапсырыс #{{ order.id }}</span>
          <span class="text-gray-500">{{ new Date(order.created_at).toLocaleString() }}</span>
        </div>

        <div v-for="item in order.items" :key="item.id" class="flex justify-between mb-1">
          <span>{{ item.product.name }} x {{ item.quantity }}</span>
          <span>{{ item.price * item.quantity }} ₸</span>
        </div>

        <div class="mt-2 font-bold text-right">
          Жалпы: {{ order.total }} ₸
        </div>

        <div class="mt-2">
          <span
            :class="{
              'text-green-600': order.status === 'completed',
              'text-yellow-600': order.status === 'pending',
              'text-red-600': order.status === 'canceled'
            }"
          >
            Статус: {{ order.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'

const { get } = useApi()
const orders = ref([])

onMounted(async () => {
  try {
    orders.value = await get('/orders')
  } catch (err) {
    console.error(err)
    alert('❌ Тапсырыстарды жүктеу мүмкін болмады')
  }
})
</script>

<style scoped>
</style>
