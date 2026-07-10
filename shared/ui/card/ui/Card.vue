<script setup lang="ts">
import { Card as LibraryCard } from 'ku-ui-kit'

interface Props {
  hoverable?: boolean
  padding?: string
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  padding: 'p-5'
})
</script>

<template>
  <LibraryCard v-bind="props">
    <slot />
  </LibraryCard>
</template>
