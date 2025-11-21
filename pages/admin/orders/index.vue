<template>
  <div class="p-8  mx-auto">
    <h1 class="text-2xl font-bold mb-6">📝 Менің тапсырыстарым</h1>

    <div v-if="orders.length === 0" class="text-gray-600">
      Сізде тапсырыс жоқ 😕
    </div>

    <div v-else class="grid grid-cols-4 gap-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="border rounded-xl p-5 mb-5 shadow bg-white transition hover:shadow-md"
      >
        <!-- Order header -->
        <div class="flex justify-between items-center mb-3">
          <span class="font-semibold text-lg">Тапсырыс #{{ order.id }}</span>

          <span class="text-gray-700 font-medium">
            {{ getUserName(order.user_id) }}
          </span>

          <span class="text-gray-500 text-sm">
            {{ formatDate(order.created_at) }}
          </span>
        </div>

        <!-- Order items -->
        <div
          v-for="item in order.items"
          :key="item.id"
          class="flex justify-between items-start mb-3 p-3 rounded border bg-gray-50"
        >
          <div>
            <p><b>Дүкен:</b> {{ getPartnerName(item.partner_id) }}</p>
            <p><b>Тауар:</b> {{ item.product?.name }}</p>
            <p><b>Саны:</b> {{ item.quantity }}</p>
          </div>

          <span class="font-semibold text-lg">
            {{ item.price * item.quantity }} ₸
          </span>
        </div>

        <!-- Total -->
        <div class="mt-3 font-bold text-right text-lg">
          Жалпы: {{ order.total }} ₸
        </div>

        <!-- Status -->
        <div class="mt-2">
          <span
            :class="{
              'text-green-600': order.status === 'completed',
              'text-yellow-600': order.status === 'pending',
              'text-red-600': order.status === 'canceled'
            }"
            class="font-bold"
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
import { usePartnerStore } from '~/stores/partner'

const { get } = useApi()

const orders = ref([])
const partners = ref([])
const users = ref([])

const partnerStore = usePartnerStore()

// Helpers
const getPartnerName = (id) =>
  partners.value.find((p) => p.id === id)?.company_name || '—'

const getUserName = (id) =>
  users.value.find((u) => u.id === id)?.name || '—'

const formatDate = (date) =>
  new Date(date).toLocaleString('kk-KZ', {
    hour12: false,
  })

onMounted(async () => {
  try {
    orders.value = await get('/orders-partner')
  } catch (err) {
    console.error(err)
    alert('❌ Тапсырыстарды жүктеу мүмкін болмады')
  }

  // Partner load
  const adminData = await get('/admin/me')
  partnerStore.setPartner(adminData)

  // Users load
  users.value = await get('/users')

  // Only this partner orders
  orders.value = orders.value.filter(
    (order) => order.user_id === partnerStore.partner.id
  )

  // Partners load
  partners.value = await get('/admin/partners')
})
</script>
