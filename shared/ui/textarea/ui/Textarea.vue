<script setup lang="ts">
import { Textarea as LibraryTextarea } from 'ku-ui-kit'

interface Props {
  placeholder?: string
  disabled?: boolean
  error?: string
  label?: string
  modelValue?: string
  rows?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  error: '',
  label: '',
  modelValue: '',
  rows: 4
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <LibraryTextarea
    v-bind="props"
    @update:modelValue="(val: string) => emit('update:modelValue', val)" />
</template>
