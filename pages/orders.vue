<template>
  <div class="p-8 w-full">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">📝 Менің тапсырыстарым</h1>

    <!-- Empty state -->
    <div v-if="orders.length === 0" class="text-center text-gray-500 text-lg mt-10">
      Сізде тапсырыс жоқ 😕
    </div>

    <!-- Orders list -->
    <div v-else class="grid grid-cols-4 gap-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="border rounded-xl p-5 mb-5 shadow hover:shadow-lg transition bg-white"
      >
        <!-- Header: Order ID and Date -->
        <div class="flex justify-between items-center mb-3">
          <span class="font-semibold text-gray-800">Тапсырыс #{{ order.id }}</span>
          <span class="text-gray-400 text-sm">{{ new Date(order.created_at).toLocaleString() }}</span>
        </div>

        <!-- Items -->
        <div v-for="item in order.items" :key="item.id" class="flex justify-between mb-1 text-gray-700">
          <span>{{ item.product.name }} x {{ item.quantity }}</span>
          <span>{{ item.price * item.quantity }} ₸</span>
        </div>

        <!-- Total -->
        <div class="mt-3 font-bold text-right text-gray-800 text-lg">
          Жалпы: {{ order.total }} ₸
        </div>

        <!-- Status -->
        <div class="mt-2 text-right">
          <span
            :class="{
              'text-green-600': order.status === 'completed',
              'text-yellow-600': order.status === 'pending',
              'text-red-600': order.status === 'canceled'
            }"
            class="font-semibold"
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
/* Hover effect for order cards */
div.border.rounded-xl:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease;
}
</style>
