<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">🛒 Себет</h1>

    <div v-if="cartItems.length === 0" class="text-gray-600">
      Себет бос 😕
    </div>

    <div v-else>
      <div
        v-for="(item, index) in cartItems"
        :key="item.id"
        class="flex justify-between items-center mb-2 border rounded p-2"
      >
        <span>{{ item.product?.name || item?.name }}</span>
        <div class="flex gap-2 items-center">
          <button @click="decrease(item.product.id, findInCart(item.product.id).partner_id)" class="px-2 border rounded">-</button>
          <span>{{ item.quantity }}</span> 
          <button @click="increase(item.product.id, findInCart(item.product.id).partner_id, item.product)" class="px-2 border rounded">+</button>
        </div>
      </div>

      <div class="mt-6 flex justify-between items-center font-bold">
        <span>Жалпы: {{ totalPrice }} ₸</span>
        <button
          v-if="userStore.token"
          @click="submitOrder"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Тапсырыс беру
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCart } from '@/composables/useCart'
import { useApi } from '@/composables/useApi'
import { useUserStore } from '~/stores/user'

const { cartItems, increase, decrease, loadCart } = useCart()
const { post } = useApi()
const userStore = useUserStore()

const findInCart = (id) => cartItems.value?.find((p) => p.product_id === id ||p.id === id)

onMounted(async () => {
  await loadCart()
  userStore.loadToken()
})

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, p) => sum + (p.product?.price || p?.price || 0) * p.quantity, 0)
)

const submitOrder = async () => {
  try {

    if (!userStore.token) {
      alert('Сіз логин болуыңыз керек!')
      return
    }

    const items = cartItems.value.map(item => ({
      product_id: item.product_id,
      partner_id: item.partner_id,
      quantity: item.quantity,
    }))

    const res = await post('/orders', { items })

    alert('✅ ' + res.message)
    // Тапсырыс сәтті болса — себетті тазалау
    cartItems.value = []
    localStorage.removeItem('cart')
  } catch (err) {
    console.error(err)
    alert('❌ Қате шықты')
  }
}
</script>

<style scoped>
button {
  transition: background-color 0.2s;
}
</style>
