<script setup lang="ts">
import { computed } from 'vue'

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

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const textareaClasses = computed(() => {
  return [
    'w-full border rounded-lg p-3 outline-none transition duration-200 text-sm bg-white resize-y',
    props.error
      ? 'border-red-500 focus:ring-2 focus:ring-red-400 focus:border-red-500'
      : 'border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400',
    props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-70' : ''
  ].join(' ')
})
</script>

<template>
  <div class="w-full flex flex-col gap-1.5">
    <label
      v-if="label"
      class="text-xs font-semibold text-gray-700 select-none">
      {{ props.label }}
    </label>
    <textarea
      v-model="value"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :rows="props.rows"
      :class="textareaClasses" />
    <span
      v-if="props.error"
      class="text-xs text-red-500">
      {{ props.error }}
    </span>
  </div>
</template>
