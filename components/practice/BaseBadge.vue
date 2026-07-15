<!--
  Тапсырма 2.2: BaseBadge URL Component

  Тапсырма: Осы компонентке тест жазыңыз.
  Тексерілетін жағдайлар:
  1. `type` параметрі 'success' болғанда, тегтің астында 'bg-green-100' және 'text-green-800' кластары бар ма?
  2. `type` параметрі 'warning' болғанда, тегтің астында 'bg-yellow-100' және 'text-yellow-800' кластары бар ма?
  3. `type` параметрі 'danger' болғанда, тегтің астында 'bg-red-100' және 'text-red-800' кластары бар ма?
  4. Ұсынылған slot ішіндегі мәтін дұрыс көріне ме?
-->

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success'
})

const badgeClasses = computed(() => {
  switch (props.type) {
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'danger':
      return 'bg-red-100 text-red-800'
    case 'success':
    default:
      return 'bg-green-100 text-green-800'
  }
})
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="badgeClasses">
    <slot />
  </span>
</template>
