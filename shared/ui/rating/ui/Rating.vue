<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue?: number
  max?: number
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 5,
  max: 5,
  readonly: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const hoverValue = ref<number | null>(null)

const setRating = (val: number) => {
  if (props.readonly) return
  emit('update:modelValue', val)
}

const onMouseOver = (val: number) => {
  if (props.readonly) return
  hoverValue.value = val
}

const onMouseLeave = () => {
  hoverValue.value = null
}
</script>

<template>
  <div class="flex items-center gap-1.5 select-none">
    <button
      v-for="index in props.max"
      :key="index"
      type="button"
      :disabled="props.readonly"
      class="transition-transform duration-100 focus:outline-none"
      :class="{
        'hover:scale-125': !props.readonly,
        'cursor-default': props.readonly,
        'cursor-pointer': !props.readonly
      }"
      @click="setRating(index)"
      @mouseover="onMouseOver(index)"
      @mouseleave="onMouseLeave">
      <svg
        class="w-7 h-7 transition-colors duration-200"
        :class="{
          'text-yellow-400': (hoverValue !== null ? index <= hoverValue : index <= props.modelValue),
          'text-gray-300': (hoverValue !== null ? index > hoverValue : index > props.modelValue)
        }"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  </div>
</template>
