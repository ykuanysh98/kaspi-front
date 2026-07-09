<script setup lang="ts">
import type { Category } from '../model/types'

defineOptions({ name: 'CategorySelectItem' })

interface Props {
  categories: Category[]
  level?: number
}

withDefaults(defineProps<Props>(), {
  level: 0
})
</script>

<template>
  <template
    v-for="category in categories"
    :key="category.id">
    <option :value="category.id">
      {{ '—'.repeat(level) }} {{ category.name }}
    </option>
    <CategorySelectItem
      v-if="category.children && category.children.length"
      :categories="category.children"
      :level="level + 1" />
  </template>
</template>