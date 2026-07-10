<script setup lang="ts">
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

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        class="absolute inset-0 bg-black/50 transition-opacity"
        @click="close" />

      <div :class="['relative bg-white rounded-2xl w-full z-10 shadow-xl overflow-hidden transform transition-all', props.maxWidth]">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <slot name="header">
            <h3 class="text-lg font-bold text-gray-900">
              <slot name="title">{{ props.title }}</slot>
            </h3>
          </slot>
          <button
            @click="close"
            class="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="px-6 py-5 max-h-[75vh] overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>
