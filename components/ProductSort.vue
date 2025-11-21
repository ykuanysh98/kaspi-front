<template>
  <div class="mb-4 flex gap-3 items-center">

    <select
      v-model="store.filters.sort"
      @change="apply"
      class="border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >
      <option :value="null">Сортировка жоқ</option>
      <option value="sum_min">Баға: ↑ Өсуі</option>
      <option value="sum_max">Баға: ↓ Кемуі</option>
    </select>

  </div>
</template>

<script setup>
import { useProductStore } from '~/stores/product'
const store = useProductStore()

const apply = async () => {
  await store.fetchList()
}
</script>
