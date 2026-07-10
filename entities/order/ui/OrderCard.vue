<script setup>
import { formatMoney } from '~/shared/lib/format/money'

defineProps({
  order: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="border rounded-xl p-5 mb-5 shadow hover:shadow-lg transition bg-white border-card">
    <!-- Header: Order ID and Date -->
    <div class="flex justify-between items-center mb-3">
      <span class="font-semibold text-gray-800">Тапсырыс #{{ order.id }}</span>
      <span class="text-gray-400 text-sm">{{ new Date(order.created_at).toLocaleString() }}</span>
    </div>

    <!-- Items -->
    <div
      v-for="item in order.items"
      :key="item.id"
      class="flex justify-between mb-1 text-gray-700">
      <span>{{ item.product.name }} x {{ item.quantity }}</span>
      <span>{{ formatMoney(item.price * item.quantity) }} ₸</span>
    </div>

    <!-- Total -->
    <div class="mt-3 font-bold text-right text-gray-800 text-lg">
      Жалпы: {{ formatMoney(order.total) }} ₸
    </div>

    <!-- Status -->
    <div class="mt-2 text-right">
      <span
        :class="{
          'text-green-600': order.status === 'completed',
          'text-yellow-600': order.status === 'pending',
          'text-red-600': order.status === 'canceled'
        }"
        class="font-semibold">
        Статус: {{ order.status }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.border-card:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease;
}
</style>
