<script setup>
import { useCart } from '@/composables/useCart'
const { cartItems, addToCart, increase, decrease } = useCart()

defineProps({
  p: {
    type: Object,
    required: true,
  },
})

const findInCart = (id) => cartItems.value?.find((p) => p.product_id === id ||p.id === id)
</script>

<template>
  <div class="pointer border rounded-xl p-4 shadow bg-white flex flex-col justify-end" @click="$router.push(`/products/${p.id}`)">
      <img :src="`http://127.0.0.1:8000/storage/${p.images?.[0]?.path}`" />
      <h2 class="font-bold text-lg">{{ p.name }}</h2>
      <p class="text-gray-700 mb-2">{{ p.price }} ₸</p>
      <button
        v-if="!findInCart(p.id)" @click.stop="addToCart(p)" class="btn-primary w-full">
        Себетке қосу
      </button>
    </div>
</template>

<style scoped>
.btn-primary {
  @apply bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg;
}
</style>