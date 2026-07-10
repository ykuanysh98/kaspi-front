<script setup lang="ts">
import { useCart } from '@/entities/cart'
import type { Product } from '@/entities/product'
import ProductAddModal from './ProductAddModal.vue'
import { Button } from '~/shared/ui/button'

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
    class="flex items-center justify-between border rounded-lg px-1 py-0.5 mt-2 bg-gray-50">
    <Button
      variant="ghost"
      class="!p-1 text-lg font-bold"
      @click.stop="decrease(props.product.id, findInCart(props.product.id)?.partner_id ?? 0)">
      −
    </Button>
    <span class="font-semibold text-gray-800 text-sm">{{ findInCart(props.product.id)?.quantity ?? 0 }}</span>
    <Button
      variant="ghost"
      class="!p-1 text-lg font-bold"
      @click.stop="increase(props.product.id, findInCart(props.product.id)?.partner_id ?? 0, props.product)">
      +
    </Button>
  </div>
</template>