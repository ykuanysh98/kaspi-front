<template>
  <div class="flex justify-center gap-2 mt-6">
    <button
      @click="changePage(meta.current_page - 1)"
      :disabled="meta.current_page === 1"
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      Алдыңғы
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="changePage(page)"
      :class="['px-3 py-1 border rounded', { 'bg-blue-600 text-white': page === meta.current_page }]"
    >
      {{ page }}
    </button>

    <button
      @click="changePage(meta.current_page + 1)"
      :disabled="meta.current_page === meta.last_page"
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      Келесі
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  meta: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['page-change'])

const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= props.meta.last_page; i++) {
    arr.push(i)
  }
  return arr
})

const changePage = (page) => {
  if (page >= 1 && page <= props.meta.last_page) {
    emit('page-change', page)
  }
}
</script>
