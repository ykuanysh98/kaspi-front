<script setup>
import { ProductCard } from '@/entities/product'
import { FavoriteButton } from '@/features/toggle-favorite'
import { CartControl } from '@/features/add-to-cart'
import { onMounted, computed } from 'vue'
import { useFavorites } from '@/entities/favorite'

const { favorites, fetchFavorites } = useFavorites()

const list = computed(() => favorites.value)

onMounted(() => fetchFavorites())
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">❤️ Тандалғандар</h1>
    <div
      v-if="list.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="p in list"
        :key="p.id"
        :product="p">
        <template #favorite>
          <FavoriteButton
            :productId="p.id"
            :isFavorite="p.is_favorite" />
        </template>

        <template #cart-action>
          <CartControl :product="p" />
        </template>
      </ProductCard>
    </div>

    <p
      v-else
      class="text-gray-500 text-center text-lg mt-10">
      Пусто...
    </p>
  </div>
</template>

<style scoped>
/* Optional: smooth fade-in for products */
.grid > * {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.grid > *:hover {
  transform: translateY(-4px);
}
</style>
