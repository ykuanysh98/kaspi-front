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
    <div class="flex justify-between">
      <ProductFilters />
      <ProductSort />
    </div>
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Product v-for="p in productStore.list" :key="p.id"  :p="p" />
    </div>
    <Pagination v-if="productStore.meta" :meta="productStore.meta" @page-change="changePage" />
  
  </div>
</template>

<style scoped>
.btn-primary {
  @apply bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg;
}
</style>
