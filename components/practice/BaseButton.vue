<!--
  Тапсырма 2.1: BaseButton Component

  Тапсырма: Осы компонентке тест жазыңыз.
  Тексерілетін жағдайлар:
  1. Slot ішіне жіберілген мәтін батырманың ішінде көріне ме?
  2. `disabled` параметрі true болғанда, батырманың өзі disabled бола ма?
  3. `loading` параметрі true болғанда, батырма ішінде "Жүктелуде..." мәтіні көрініп, батырма disabled бола ма?
  4. Батырманы басқанда сыртқа 'click' оқиғасы жіберіле ме? Егер `disabled` немесе `loading` болса өтініш жіберілмеу керек!
-->

<script setup lang="ts">
interface Props {
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :disabled="props.disabled || props.loading"
    @click="handleClick"
    class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
    <span v-if="props.loading">Жүктелуде...</span>
    <slot v-else />
  </button>
</template>
