import { ref, computed } from 'vue'

export function useList<T>(initial: T[] = []) {
  const items = ref<T[]>([...initial])

  const add = (item: T) => {
    items.value.push(item)
  }

  const removeByIndex = (index: number) => {
    if (index < 0 || index >= items.value.length) return
    items.value.splice(index, 1)
  }

  const remove = (predicate: (item: T) => boolean) => {
    items.value = items.value.filter(i => !predicate(i))
  }

  const update = (predicate: (item: T) => boolean, updater: (item: T) => T) => {
    items.value = items.value.map(i =>
      predicate(i) ? updater(i) : i
    )
  }

  const find = (predicate: (item: T) => boolean) => {
    return items.value.find(predicate)
  }

  const clear = () => {
    items.value = []
  }

  const count = computed(() => items.value.length)

  return {
    items,
    add,
    remove,
    removeByIndex,
    update,
    find,
    clear,
    count,
  }
}