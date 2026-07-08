<script setup lang="ts">
import { useCart } from '@/entities/cart'
import type { Product } from '@/entities/product'
import ProductAddModal from './ProductAddModal.vue'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const { cartItems, increase, decrease } = useCart()

const findInCart = (id: number) =>
  cartItems.value?.find((p) => p.product_id === id || p.id === id)
</script>

<template>
  <div v-if="!findInCart(props.product.id)">
    <ProductAddModal
      class="w-full"
      :product="props.product" />
  </div>
  <div
    v-else
    class="flex items-center justify-between border rounded-lg px-2 py-1 mt-2 bg-gray-50">
    <button
      @click.stop="decrease(props.product.id, findInCart(props.product.id).partner_id)"
      class="text-xl font-bold text-gray-600 hover:text-red-600 transition">
      −
    </button>
    <span class="font-semibold text-gray-800">{{ findInCart(props.product.id).quantity }}</span>
    <button
      @click.stop="increase(props.product.id, findInCart(props.product.id).partner_id, props.product)"
      class="text-xl font-bold text-gray-600 hover:text-green-600 transition">
      +
    </button>
  </div>
</template>