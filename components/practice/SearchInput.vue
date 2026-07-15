<!--
  Тапсырма 3.1: SearchInput Component (Debouncing тестілеу)

  Тапсырма: Осы компонентке тест жазыңыз.
  Бұл жерде сізге Vitest-тің таймерлерді басқару мүмкіндігін қолдану керек болады!
  Тест ішінде мынаны қолданыңыз:
  - `vi.useFakeTimers()` - тест алдында уақытты жалған ету.
  - `vi.advanceTimersByTime(300)` - уақытты 300мс-қа алға жылжыту.
  - `vi.useRealTimers()` - тест соңында уақытты қалпына келтіру.

  Тексерілетін жағдайлар:
  1. Пайдаланушы мәтінді енгізгенде (input), бірден 'search' оқиғасы жіберіле ме? (Жоқ, 300мс күту керек!)
  2. Пайдаланушы енгізгеннен кейін 300мс өткен соң, 'search' оқиғасы енгізілген мәтінмен бірге бір рет қана жіберіле ме?
  3. Егер пайдаланушы 300мс өтпей тұрып қайта мәтін жазса, ескі таймер өшіп, жаңа таймер іске қосыла ма?
-->

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const searchQuery = ref('')
let timer: ReturnType<typeof setTimeout> | null = null

function handleInput() {
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    emit('search', searchQuery.value)
  }, 300)
}
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      @input="handleInput"
      type="text"
      placeholder="Іздеу..."
      class="border px-3 py-2 rounded w-full border-gray-300 focus:border-indigo-500"/>
  </div>
</template>
