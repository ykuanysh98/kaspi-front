<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationMeta } from '../model/types'

interface Props {
  meta: PaginationMeta
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const pages = computed(() => {
  const arr: number[] = []
  for (let i = 1; i <= props.meta.last_page; i++) {
    arr.push(i)
  }
  return arr
})

const changePage = (page: number) => {
  if (page >= 1 && page <= props.meta.last_page) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div class="flex justify-center gap-2 mt-6 flex-wrap">

    <!-- Previous Button -->
    <button
      @click="changePage(meta.current_page - 1)"
      :disabled="meta.current_page === 1"
      class="px-4 py-2 border rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
      Алдыңғы
    </button>

    <!-- Page Numbers -->
    <button
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'px-4 py-2 border rounded-lg transition hover:bg-blue-100',
        page === meta.current_page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700'
      ]">
      {{ page }}
    </button>

    <!-- Next Button -->
    <button
      @click="changePage(meta.current_page + 1)"
      :disabled="meta.current_page === meta.last_page"
      class="px-4 py-2 border rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
      Келесі
    </button>

  </div>
</template>