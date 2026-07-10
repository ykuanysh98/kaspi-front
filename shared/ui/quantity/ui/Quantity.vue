<script setup lang="ts">
import { Button } from '~/shared/ui/button'

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

const decrease = () => {
  if (props.disabled) return
  if (props.modelValue > props.min) {
    const newValue = props.modelValue - 1
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const increase = () => {
  if (props.disabled) return
  if (props.max === null || props.modelValue < props.max) {
    const newValue = props.modelValue + 1
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<template>
  <div class="flex items-center border rounded-lg overflow-hidden bg-white max-w-fit border-gray-200">
    <Button
      variant="ghost"
      class="!p-2 text-md font-bold focus:ring-0 rounded-none disabled:opacity-50"
      :disabled="props.disabled || props.modelValue <= props.min"
      @click="decrease">
      −
    </Button>
    <div class="px-4 font-semibold text-gray-800 select-none text-sm min-w-[2.5rem] text-center">
      {{ props.modelValue }}
    </div>
    <Button
      variant="ghost"
      class="!p-2 text-md font-bold focus:ring-0 rounded-none disabled:opacity-50"
      :disabled="props.disabled || (props.max !== null && props.modelValue >= props.max)"
      @click="increase">
      +
    </Button>
  </div>
</template>
