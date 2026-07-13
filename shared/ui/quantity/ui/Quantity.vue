<script setup lang="ts">
import { Quantity as LibraryQuantity } from 'ku-ui-kit'

interface Props {
  modelValue?: number
  min?: number
  max?: number | null
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  min: 1,
  max: null,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()
</script>

<template>
  <LibraryQuantity
    v-bind="props"
    @update:modelValue="(val: number) => emit('update:modelValue', val)"
    @change="(val: number) => emit('change', val)" />
</template>
