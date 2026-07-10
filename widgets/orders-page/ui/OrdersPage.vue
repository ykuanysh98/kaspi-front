<script setup>
import { onMounted } from 'vue'
import { useOrders, OrderCard } from '~/entities/order'

const { orders, fetchOrders } = useOrders()

onMounted(async () => {
  try {
    await fetchOrders()
  } catch {
    alert('❌ Тапсырыстарды жүктеу мүмкін болмады')
  }
})
</script>

<template>
  <div class="p-8 w-full">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">📝 Менің тапсырыстарым</h1>

    <!-- Empty state -->
    <div
      v-if="orders.length === 0"
      class="text-center text-gray-500 text-lg mt-10">
      Сізде тапсырыс жоқ 😕
    </div>

    <!-- Orders list -->
    <div
      v-else
      class="grid grid-cols-4 gap-6">
      <OrderCard
        v-for="order in orders"
        :key="order.id"
        :order="order" />
    </div>
  </div>
</template>
