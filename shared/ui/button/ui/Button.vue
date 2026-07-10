<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button'
})

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400 focus:ring-2 disabled:bg-blue-400',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300 focus:ring-2 disabled:bg-gray-100 disabled:text-gray-400',
  danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-400 focus:ring-2 disabled:bg-red-400',
  success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-400 focus:ring-2 disabled:bg-green-400',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 disabled:text-gray-300'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg font-medium',
  lg: 'px-6 py-3.5 text-base rounded-xl font-medium'
}

const buttonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center font-medium transition duration-200 focus:outline-none disabled:cursor-not-allowed select-none active:scale-[0.98]',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.block ? 'w-full flex' : '',
    (props.disabled || props.loading) ? 'opacity-70 pointer-events-none' : ''
  ].join(' ')
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses">
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      fill="none"
      viewBox="0 0 24 24">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <slot />
  </button>
</template>
