<script setup>
import { useCart } from '@/entities/cart'
import { useUserStore } from '~/entities/user'
import { useApi } from '~/shared/api'

const { cartItems } = useCart()
const { post } = useApi()
const userStore = useUserStore()

const submitOrder = async () => {
  try {
    if (!userStore.token) {
      alert('Сіз логин болуыңыз керек!')
      return
    }

    const items = cartItems.value.map(item => ({
      product_id: item.product_id,
      partner_id: item.partner_id,
      quantity: item.quantity
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

<template>
  <button
    v-if="userStore.token"
    @click="submitOrder"
    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition">
    Тапсырыс беру
  </button>
</template>
