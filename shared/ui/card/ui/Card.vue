<script setup lang="ts">
interface Props {
  hoverable?: boolean
  padding?: string
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  padding: 'p-5'
})
</script>

<template>
  <div
    :class="[
      'border rounded-xl bg-white shadow-sm transition-all duration-300 border-gray-200',
      props.padding,
      props.hoverable ? 'hover:shadow-lg hover:translate-y-[-2px] cursor-pointer' : ''
    ]">
    <slot />
  </div>
</template>
