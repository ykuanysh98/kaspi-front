<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useProductStore } from '~/entities/product'
import { CategorySelectItem, useCategoryStore } from '~/entities/category'
import type { Category } from '~/entities/category'
import { useDebounce } from '~/shared/lib/debounce'
import { useRoute, useRouter } from 'vue-router'
import type { LocalFilters } from '../model/types'
import { Input } from '~/shared/ui/input'
import { Select } from '~/shared/ui/select'

const router = useRouter()
const route = useRoute()
const store = useProductStore()
const debouncedFetch = useDebounce(() => store.fetchList(), 400)

const parseNumber = (val: unknown): number | '' => {
  if (val === undefined || val === null || val === '') return ''
  const n = Number(val)
  return isNaN(n) ? '' : n
}

const local = reactive<LocalFilters>({
  search: '',
  min_price: '',
  max_price: '',
  category_id: ''
})

const categoryStore = useCategoryStore()
const categories = ref<Category[]>([])

const syncFromQuery = () => {
  const q = route.query

  local.search = typeof q.search === 'string' ? q.search : ''
  local.min_price = parseNumber(q.min_price)
  local.max_price = parseNumber(q.max_price)
  local.category_id = parseNumber(q.category_id)

  Object.assign(store.filters, local)
}

onMounted(async () => {
  await categoryStore.fetchCategories()
  categories.value = categoryStore.categories
  syncFromQuery()
  debouncedFetch()
})

const apply = () => {
  router.replace({
    query: {
      ...route.query,
      search: local.search || undefined,
      min_price: local.min_price === '' ? undefined : local.min_price,
      max_price: local.max_price === '' ? undefined : local.max_price,
      category_id: local.category_id === '' ? undefined : local.category_id
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
  <div class="flex flex-wrap gap-3 items-end mb-4">

    <!-- Search -->
    <div class="w-full sm:w-64">
      <Input
        v-model="local.search"
        placeholder="Іздеу..."
        @input="apply" />
    </div>

    <!-- Min Price -->
    <div class="w-32">
      <Input
        v-model.number="local.min_price"
        type="number"
        placeholder="Мин. баға"
        @input="apply" />
    </div>

    <!-- Max Price -->
    <div class="w-32">
      <Input
        v-model.number="local.max_price"
        type="number"
        placeholder="Макс. баға"
        @input="apply" />
    </div>

    <!-- Category Select -->
    <div class="w-48">
      <Select
        v-model="local.category_id"
        placeholder="Барлығы"
        @change="apply">
        <CategorySelectItem :categories="categories" />
      </Select>
    </div>

  </div>
</template>