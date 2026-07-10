<script setup lang="ts">
import { computed } from 'vue'

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

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const selectClasses = computed(() => {
  return [
    'w-full border rounded-lg px-4 py-3 outline-none transition duration-200 text-sm bg-white',
    props.error
      ? 'border-red-500 focus:ring-2 focus:ring-red-400 focus:border-red-500'
      : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed opacity-70' : ''
  ].join(' ')
})
</script>

<template>
  <div class="w-full flex flex-col gap-1.5 mb-2">
    <label
      v-if="props.label"
      class="text-xs font-semibold text-gray-700 select-none">
      {{ props.label }}
    </label>
    <div class="relative">
      <select
        v-model="value"
        :disabled="props.disabled"
        :class="selectClasses">
        <option
          v-if="props.placeholder"
          value="">
          {{ props.placeholder }}
        </option>
        <option
          v-for="opt in props.options"
          :key="opt.value"
          :value="opt.value">
          {{ opt.label }}
        </option>
        <slot />
      </select>
    </div>
    <span
      v-if="props.error"
      class="text-xs text-red-500">
      {{ props.error }}
    </span>
  </div>
</template>
