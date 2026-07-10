<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useCart } from '@/entities/cart'
import { useUserStore } from '~/entities/user'
import { SubmitOrderButton } from '~/features/create-order'
import { formatMoney } from '~/shared/lib/format/money'
import { Quantity } from '~/shared/ui/quantity'

import type { CartProduct } from '~/entities/cart'

interface CartItemExtended {
  id?: number
  product_id: number
  partner_id?: number
  quantity: number
  price?: number
  name?: string
  product?: {
    id: number
    name: string
    price: number
    images?: { path: string }[]
    partners?: { id: number; pivot: { price?: number; quantity?: number } }[]
  }
}

const { cartItems, increase, decrease, loadCart } = useCart()
const userStore = useUserStore()

const items = computed(() => (cartItems.value || []) as unknown as CartItemExtended[])

const findInCart = (id: number) => items.value.find((p) => p.product_id === id || p.id === id)

const updateItemQuantity = (item: CartItemExtended, newQuantity: number) => {
  const diff = newQuantity - item.quantity
  const partnerId = findInCart(item.product?.id ?? 0)?.partner_id ?? 0
  if (diff > 0 && item.product) {
    increase(item.product.id, partnerId, item.product as unknown as CartProduct)
  } else if (diff < 0 && item.product) {
    decrease(item.product.id, partnerId)
  }
}

onMounted(async () => {
  await loadCart()
  userStore.loadToken()
})

const totalPrice = computed(() =>
  items.value.reduce((sum, p) => sum + (p?.price || p?.product?.price || 0) * p.quantity, 0)
)
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">🛒 Себет</h1>

    <!-- Empty state -->
    <div
      v-if="items.length === 0"
      class="text-center text-gray-500 text-lg mt-10">
      Себет бос 😕
    </div>

    <!-- Cart items -->
    <div v-else>
      <div
        v-for="item in items"
        :key="item.id"
        class="flex justify-between items-center mb-3 border rounded-lg p-4 hover:shadow-md transition">
        <div class="flex items-center gap-4">
          <img
            v-if="item.product?.images?.[0]?.path"
            :src="`http://127.0.0.1:8000/storage/${item.product.images[0].path}`"
            alt=""
            class="w-16 h-16 object-cover rounded-lg"/>
          <span class="font-medium text-gray-800">{{ item.product?.name || item?.name }}</span>
        </div>

        <div>
          <Quantity
            :modelValue="item.quantity"
            @update:modelValue="(val: number) => updateItemQuantity(item, val)" />
        </div>
      </div>

      <!-- Total and checkout -->
      <div class="mt-8 flex flex-col sm:flex-row justify-between items-center font-bold text-gray-800 gap-4">
        <span class="text-lg">Жалпы: {{ formatMoney(totalPrice) }} ₸</span>
        <SubmitOrderButton />
      </div>
    </div>
  </div>
</template>
