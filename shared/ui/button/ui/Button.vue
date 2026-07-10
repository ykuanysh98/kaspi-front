<script setup lang="ts">
import { Button as LibraryButton } from 'ku-ui-kit'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'soft'
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
</script>

<template>
  <LibraryButton
    v-bind="props"
    :type="type">
    <slot />
  </LibraryButton>
</template>
