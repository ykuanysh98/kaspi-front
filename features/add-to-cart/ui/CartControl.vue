<script setup lang="ts">
import { useCart } from '@/entities/cart'
import type { Product } from '@/entities/product'
import ProductAddModal from './ProductAddModal.vue'
import { Quantity } from '~/shared/ui/quantity'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const { cartItems, increase, decrease } = useCart()

const findInCart = (id: number) =>
  cartItems.value?.find((p) => p.product_id === id || p.id === id)

const updateQuantity = (val: number) => {
  const item = findInCart(props.product.id)
  if (!item) return
  const partnerId = item.partner_id
  if (val > item.quantity) {
    increase(props.product.id, partnerId ?? 0, props.product)
  } else if (val < item.quantity) {
    decrease(props.product.id, partnerId ?? 0)
  }
}
</script>

<template>
  <div v-if="!findInCart(props.product.id)">
    <ProductAddModal
      class="w-full"
      :product="props.product" />
  </div>
  <div
    v-else
    class="flex items-center justify-between mt-2">
    <Quantity
      :modelValue="findInCart(props.product.id)?.quantity ?? 1"
      @update:modelValue="updateQuantity"
      class="w-full" />
  </div>
</template>