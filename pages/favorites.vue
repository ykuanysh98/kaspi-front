<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">❤️ Тандалғандар</h1>
    <div v-if="list.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Product v-for="p in list" :key="p.id" :p="p" />
    </div>
    <p v-else class="text-gray-500">Пусто...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFavorites } from '@/composables/useFavorites'

const { favorites, fetchFavorites } = useFavorites()

const list = computed(() => favorites.value)

onMounted(() => fetchFavorites())
</script>
