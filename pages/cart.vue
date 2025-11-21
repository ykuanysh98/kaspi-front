<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">🛒 Себет</h1>

    <!-- Empty state -->
    <div v-if="cartItems.length === 0" class="text-center text-gray-500 text-lg mt-10">
      Себет бос 😕
    </div>

    <!-- Cart items -->
    <div v-else>
      <div
        v-for="(item, index) in cartItems"
        :key="item.id"
        class="flex justify-between items-center mb-3 border rounded-lg p-4 hover:shadow-md transition"
      >
        <div class="flex items-center gap-4">
          <img 
            v-if="item.product?.images?.[0]?.path" 
            :src="`http://127.0.0.1:8000/storage/${item.product.images[0].path}`" 
            alt="" 
            class="w-16 h-16 object-cover rounded-lg"
          />
          <span class="font-medium text-gray-800">{{ item.product?.name || item?.name }}</span>
        </div>

        <div class="flex gap-2 items-center">
          <button 
            @click="decrease(item.product.id, findInCart(item.product.id).partner_id)" 
            class="px-3 py-1 border rounded hover:bg-red-100 transition"
          >−</button>
          <span class="font-semibold">{{ item.quantity }}</span> 
          <button 
            @click="increase(item.product.id, findInCart(item.product.id).partner_id, item.product)" 
            class="px-3 py-1 border rounded hover:bg-green-100 transition"
          >+</button>
        </div>
      </div>

      <!-- Total and checkout -->
      <div class="mt-8 flex flex-col sm:flex-row justify-between items-center font-bold text-gray-800 gap-4">
        <span class="text-lg">Жалпы: {{ totalPrice }} ₸</span>
        <button
          v-if="userStore.token"
          @click="submitOrder"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
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

const findInCart = (id) => cartItems.value?.find((p) => p.product_id === id || p.id === id)

onMounted(async () => {
  await loadCart()
  userStore.loadToken()
})

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, p) => sum + (p?.price || p?.product.price || 0) * p.quantity, 0)
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
  transition: all 0.2s ease;
}
</style>
