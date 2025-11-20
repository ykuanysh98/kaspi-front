<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Каталогтар</h1>
    <ul>
      <CategoryItem 
        v-for="cat in categories" 
        :key="cat.id" 
        :category="cat" 
      />
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '~/stores/category'
import CategoryItem from '../components/сategoryItem.vue'

const store = useCategoryStore()
const categories = store.categories

onMounted(() => {
  store.fetchCategories()
})
</script>
