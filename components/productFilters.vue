
<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useProductStore } from '~/entities/product'
import { useDebounce } from '~/shared/lib/debounce/useDebounce'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '~/shared/api'

import CategorySelectItem from './сategorySelectItem.vue'

const router = useRouter()
const route = useRoute()
const store = useProductStore()
const debouncedFetch = useDebounce(store.fetchList, 400)

type LocalFilters = {
  search: string
  min_price: number | ''
  max_price: number | ''
  category_id: number | ''
}

const parseNumber = (val: unknown): number | '' => {
  const n = Number(val)
  return isNaN(n) ? '' : n
}

const local = reactive<LocalFilters>({
  search: '',
  min_price: '',
  max_price: '',
  category_id: ''
})

const categories = ref([])
const { get } = useApi()

const syncFromQuery = () => {
  const q = route.query

  const search = typeof q.search === 'string' ? q.search : ''

  local.search = search
  local.min_price = parseNumber(q.min_price)
  local.max_price = parseNumber(q.max_price)
  local.category_id = parseNumber(q.category_id)

  Object.assign(store.filters, local)
}

onMounted(async () => {
  categories.value = await get('/categories')
  syncFromQuery()
  debouncedFetch()
})

const apply = () => {
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      search: local.search || undefined,
      min_price: local.min_price || undefined,
      max_price: local.max_price || undefined,
      category_id: local.category_id || undefined
    }
  })
}

watch(
  () => route.query,
  () => {
    syncFromQuery()
    debouncedFetch()
  },
  { deep: true }
)
</script>

<template>
  <div class="flex flex-wrap gap-3 mb-4">

    <!-- Search -->
    <input
      v-model="local.search"
      @input="apply"
      placeholder="Іздеу..."
      class="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>

    <!-- Min Price -->
    <input
      v-model.number="local.min_price"
      @input="apply"
      type="number"
      placeholder="Мин. баға"
      class="border border-gray-300 rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>

    <!-- Max Price -->
    <input
      v-model.number="local.max_price"
      @input="apply"
      type="number"
      placeholder="Макс. баға"
      class="border border-gray-300 rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>

    <!-- Category Select -->
    <select
      v-model="local.category_id"
      @change="apply"
      class="border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
      <option value="">Барлығы</option>
      <CategorySelectItem :categories="categories" />
    </select>

  </div>
</template>
