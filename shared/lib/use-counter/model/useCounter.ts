import { ref, computed } from "vue";

export function useCounter(initial: number = 0) {
  const count = ref<number>(initial);
  const doubled = computed<number>(() => count.value * 2);

  function increment() {
    count.value++;
  }

  function reset() {
    count.value = initial;
  }

  return { count, doubled, increment, reset };
}
