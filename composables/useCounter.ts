// composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initial: number = 0) {
  const count = ref<number>(initial)
  const doubled = computed<number>(() => count.value * 2)

  function increment() { count.value++ }
  function reset() { count.value = initial }

  return { count, doubled, increment, reset }
}

export function useToggle(initial: boolean = false) {
  const isOn = ref<boolean>(initial)

  function toggle() { isOn.value = !isOn.value }
  function turnOn() { isOn.value = true }
  function turnOff() { isOn.value = false }

  return { isOn, toggle, turnOn, turnOff }
}