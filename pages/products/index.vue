<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '~/stores/product'
import { useCart } from '@/composables/useCart'

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
      <Product
        v-for="p in productStore.list"
        :key="p.id"
        :p="p"
        class="transform hover:scale-105 transition duration-300 ease-in-out"
      />
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="productStore.meta"
      :meta="productStore.meta"
      @page-change="changePage"
      class="mt-6"
    />

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
