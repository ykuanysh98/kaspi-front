<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePartnerStore } from '~/entities/partner'
import { PartnerReviews } from '~/widgets/partner-reviews'
import { ProductCard } from '@/entities/product'
import { FavoriteButton } from '@/features/toggle-favorite'
import { CartControl } from '@/features/add-to-cart'

const route = useRoute()
const partnerStore = usePartnerStore()
const partner = computed(() => partnerStore.current)

onMounted(async () => {
  await partnerStore.fetchById(route.params.id)
})
</script>

<template>
  <div class="max-w-5xl mx-auto p-8">
    <!-- Партнер туралы ақпарат -->
    <div
      v-if="partner"
      class="mb-8 bg-white p-6 rounded-lg shadow">
      <h1 class="text-3xl font-bold mb-1 text-gray-800">{{ partner.company_name }} дүкені</h1>
      <p class="text-gray-600">{{ partner.email }}</p>
    </div>

    <!-- Өнімдер -->
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">🛍️ Өнімдері</h2>

    <div
      v-if="partner && partner.products?.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ProductCard
        v-for="p in partner.products"
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

    <div
      v-else
      class="text-gray-500 text-center py-10">
      Бұл сатушыда өнім жоқ 😕
    </div>

    <!-- Пікірлер -->
    <PartnerReviews :partnerId="route.params.id" />
  </div>
</template>

<style scoped>
/* Shadow және padding стильдері арқылы заманауи look берілді */
</style>
