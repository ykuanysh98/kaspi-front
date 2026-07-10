<script setup lang="ts">
import { Input as LibraryInput } from 'ku-ui-kit'

interface Props {
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  label?: string
  modelValue?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  error: '',
  label: '',
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <LibraryInput
    v-bind="props"
    @update:modelValue="val => emit('update:modelValue', val)" />
</template>
