<script setup lang="ts">
import type { Product } from '@/entities/product'
import { ProductCard } from '@/entities/product'
import { FavoriteButton } from '@/features/toggle-favorite'
import { CartControl } from '@/features/add-to-cart'

interface Props {
  product: Product
}

const props = defineProps<Props>()
</script>

<template>
  <ProductCard :product="props.product">
    <template #favorite>
      <FavoriteButton
        :productId="props.product.id"
        :isFavorite="props.product.is_favorite" />
    </template>

    <template #cart-action>
      <CartControl :product="props.product" />
    </template>
  </ProductCard>
</template>