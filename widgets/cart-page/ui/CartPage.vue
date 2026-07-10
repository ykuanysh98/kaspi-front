<script setup>
import { computed, onMounted } from 'vue'

import { useCart } from '@/entities/cart'
import { useUserStore } from '~/entities/user'
import { SubmitOrderButton } from '~/features/create-order'
import { Button } from '~/shared/ui/button'
import { formatMoney } from '~/shared/lib/format/money'

const { cartItems, increase, decrease, loadCart } = useCart()
const userStore = useUserStore()

const findInCart = (id) => cartItems.value?.find((p) => p.product_id === id || p.id === id)

onMounted(async () => {
  await loadCart()
  userStore.loadToken()
})

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, p) => sum + (p?.price || p?.product.price || 0) * p.quantity, 0)
)
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">🛒 Себет</h1>

    <!-- Empty state -->
    <div
      v-if="cartItems.length === 0"
      class="text-center text-gray-500 text-lg mt-10">
      Себет бос 😕
    </div>

    <!-- Cart items -->
    <div v-else>
      <div
        v-for="item in cartItems"
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

        <div class="flex gap-2 items-center">
          <Button
            variant="secondary"
            class="!px-3 !py-1"
            @click="decrease(item.product.id, findInCart(item.product.id).partner_id)">
            −
          </Button>
          <span class="font-semibold">{{ item.quantity }}</span>
          <Button
            variant="secondary"
            class="!px-3 !py-1"
            @click="increase(item.product.id, findInCart(item.product.id).partner_id, item)">
            +
          </Button>
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
