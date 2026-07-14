<script setup lang="ts">
import { Modal as LibraryModal } from 'ku-ui-kit'

interface Props {
  modelValue?: boolean
  title?: string
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  maxWidth: 'max-w-xl'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()
</script>

<template>
  <LibraryModal
    v-bind="props"
    @update:modelValue="(val: boolean) => emit('update:modelValue', val)"
    @close="emit('close')">
    <template
      v-if="$slots.header"
      #header>
      <slot name="header" />
    </template>
    <template
      v-if="$slots.title"
      #title>
      <slot name="title" />
    </template>
    <slot />
  </LibraryModal>
</template>
