<script setup lang="ts">
import { computed } from 'vue'

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

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', String(val))
  }
})

const inputClasses = computed(() => {
  return [
    'w-full border rounded-lg p-3 outline-none transition duration-200 text-sm bg-white',
    props.error
      ? 'border-red-500 focus:ring-2 focus:ring-red-400 focus:border-red-500'
      : 'border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400',
    props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-70' : ''
  ].join(' ')
})
</script>

<template>
  <div class="w-full flex flex-col gap-1.5 mb-2">
    <label
      v-if="label"
      class="text-xs font-semibold text-gray-700 select-none">
      {{ label }}
    </label>
    <div class="relative">
      <input
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses" />
    </div>
    <span
      v-if="error"
      class="text-xs text-red-500">
      {{ error }}
    </span>
  </div>
</template>
