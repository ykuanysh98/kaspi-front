<template>
  <div class="flex flex-wrap gap-3 mb-4">

    <input
      v-model="local.search"
      @input="apply"
      placeholder="Іздеу..."
      class="border rounded px-3 py-2"
    />

    <input
      v-model.number="local.min_price"
      @input="apply"
      type="number"
      placeholder="Мин. баға"
      class="border rounded px-3 py-2 w-32"
    />

    <input
      v-model.number="local.max_price"
      @input="apply"
      type="number"
      placeholder="Макс. баға"
      class="border rounded px-3 py-2 w-32"
    />
 
    <select v-model="local.category_id" @change="apply" class="border rounded px-3 py-2 w-48">
      <option value="">Барлығы</option>
      <CategorySelectItem :categories="categories" />
    </select>

  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useProductStore } from '~/stores/product'
import { useDebounce } from '@/composables/useDebounce'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'

import CategorySelectItem from './сategorySelectItem.vue'

const router = useRouter()
const route = useRoute()

const store = useProductStore()
const debouncedFetch = useDebounce(store.fetchList, 400)

const local = reactive({
  search: '',
  min_price: '',
  max_price: '',
  category_id: ''
})

const categories = ref([])
const { get } = useApi()

const syncFromQuery = () => {
  const q = route.query

  local.search = q.search ?? ''
  local.min_price = +q.min_price || ''
  local.max_price = +q.max_price || ''
  local.category_id = +q.category_id || ''

  store.filters.search = local.search
  store.filters.min_price = local.min_price
  store.filters.max_price = local.max_price
  store.filters.category_id = local.category_id
}

onMounted(async() => {
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
    },
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
