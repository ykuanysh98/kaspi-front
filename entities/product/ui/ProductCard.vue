<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Product } from '../model/types'
import { getProductImage } from '../lib/getProductImage'
import { formatMoney } from '~/shared/lib/format/money'
import { Card } from '~/shared/ui/card'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const router = useRouter()
</script>

<template>
  <Card
    hoverable
    padding="p-0"
    class="min-w-[200px] relative pointer flex flex-col justify-between overflow-hidden hover:scale-105 transform duration-300 ease-in-out">
    <div
      class="relative w-full h-48 md:h-56 overflow-hidden cursor-pointer"
      @click="router.push(`/products/${props.product.id}`)">
      <img
        :src="getProductImage(props.product.images?.[0]?.path) || undefined"
        alt="product image"
        class="w-full h-full object-cover"/>

      <!-- Favorite action slot -->
      <slot name="favorite" />
    </div>

    <div class="p-4 flex flex-col gap-2">
      <h2 class="font-bold text-lg text-gray-800 truncate">{{ props.product.name }}</h2>
      <p class="text-gray-700 font-semibold">{{ formatMoney(props.product.price) }} ₸</p>
      <p class="text-gray-700 font-semibold">{{ props.product.partners?.[0]?.pivot.quantity || 0 }} шт.</p>

      <!-- Cart action slot -->
      <slot name="cart-action" />
    </div>
  </Card>
</template>