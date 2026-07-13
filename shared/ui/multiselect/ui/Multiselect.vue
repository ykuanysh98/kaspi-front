<script setup lang="ts">
import { Multiselect as LibraryMultiselect } from 'ku-ui-kit'
import type { OptionLike, ModelValue } from '../model/types'

interface Props {
  modelValue?: ModelValue
  options?: OptionLike[]
  multiple?: boolean
  placeholder?: string
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  multiple: false,
  placeholder: 'Выберите...',
  clearable: true
})

const emit = defineEmits<{
  'update:modelValue': [value: ModelValue]
}>()
</script>

<template>
  <LibraryMultiselect
    v-bind="props"
    @update:modelValue="(val: ModelValue) => emit('update:modelValue', val)" />
</template>