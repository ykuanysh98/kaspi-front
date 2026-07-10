<script setup>
import { onMounted } from 'vue'
import { ProductCardWithActions } from '~/widgets/product-card'
import { ProductSort, ProductFilters } from '@/features/filter-products'
import { useProductStore } from '~/entities/product'
import { useCart } from '@/entities/cart'
import { Pagination } from '@/shared/ui/pagination'

const { loadCart } = useCart()
const productStore = useProductStore()

onMounted(async () => {
  await productStore.fetchList()
  await loadCart()
})

const changePage = async (page) => {
  await productStore.fetchList(page)
}
</script>

<template>
  <div class="p-6">

    <!-- Filters & Sort -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <ProductFilters />
      <ProductSort />
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCardWithActions
        v-for="p in productStore.list"
        :key="p.id"
        :product="p"
        class="transform hover:scale-105 transition duration-300 ease-in-out"/>
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="productStore.meta"
      :meta="productStore.meta"
      @pageChange="changePage"
      class="mt-6"/>

  </div>
</template>

<style scoped>
/* Primary button modern style */
.btn-primary {
  @apply bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200;
}

/* Card hover effect for Product component */
.product-card {
  @apply bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition transform duration-300 ease-in-out;
}
</style>
