<script setup lang="ts">
import { Rating as LibraryRating } from 'ku-ui-kit'

interface Props {
  modelValue?: number
  max?: number
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 5,
  max: 5,
  readonly: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<template>
  <LibraryRating
    v-bind="props"
    @update:modelValue="(val: number) => emit('update:modelValue', val)" />
</template>
