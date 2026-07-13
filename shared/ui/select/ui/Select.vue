<script setup lang="ts">
import { Select as LibrarySelect } from 'ku-ui-kit'

interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue?: string | number
  options?: Option[]
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  label: '',
  placeholder: 'Таңдаңыз...',
  disabled: false,
  error: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()
</script>

<template>
  <LibrarySelect
    v-bind="props"
    @update:modelValue="(val: string | number) => emit('update:modelValue', val)"
    @change="(val: string | number) => emit('change', val)">
    <slot />
  </LibrarySelect>
</template>
