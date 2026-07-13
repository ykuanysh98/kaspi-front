<script setup lang="ts">
import { Pagination as LibraryPagination } from 'ku-ui-kit'
import type { PaginationMeta } from '../model/types'

interface Props {
  meta: PaginationMeta
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()
</script>

<template>
  <LibraryPagination
    v-bind="props"
    @page-change="(page: number) => emit('page-change', page)" />
</template>