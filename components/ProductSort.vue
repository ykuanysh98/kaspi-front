<template>
  <div class="mb-4 flex gap-3 items-center">

    <select
      v-model="store.filters.sort"
      @change="apply"
      class="border rounded px-3 py-2"
    >
      <option :value="null">Сортировка жоқ</option>
      <option value="sum_min">Баға: ↑ Өсуі</option>
      <option value="sum_max">Баға: ↓ Кемуі</option>
      <!-- <option value="name_asc">Атауы: A → Z</option>
      <option value="name_desc">Атауы: Z → A</option>
      <option value="newest">Жаңалары (New)</option>
      <option value="oldest">Ескілері</option> -->
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
