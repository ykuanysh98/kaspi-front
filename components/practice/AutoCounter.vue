<!--
  Тапсырма 3.2: AutoCounter Component (Таймерлер және Lifecycle тестілеу)

  Тапсырма: Осы компонентке тест жазыңыз.
  Тексерілетін жағдайлар:
  1. Компонент іске қосылғанда (mounted) экранда нөл көріне ме?
  2. Әр 1 секунд (1000мс) өткен сайын санауыш (counter) 1-ге артып отыра ма?
  3. Компонент өшкен кезде (unmounted), `clearInterval` шақырылып, таймер дұрыс тазалана ма?

  Нұсқау:
  - Компонентті өшіру үшін `wrapper.unmount()` қолданылады.
  - clearInterval-дың шақырылғанын тексеру үшін:
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    // одан соң wrapper.unmount() шақырып тексеру:
    expect(clearIntervalSpy).toHaveBeenCalled()
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const counter = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    counter.value++
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="p-4 border rounded text-center">
    <div class="text-2xl font-bold mb-2">Авто санауыш</div>
    <div
      data-testid="counter-val"
      class="text-4xl text-indigo-600 font-mono">{{ counter }}</div>
  </div>
</template>
