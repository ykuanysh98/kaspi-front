<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Каталогтар</h1>

    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <CategoryItem 
        v-for="cat in categories" 
        :key="cat.id" 
        :category="cat" 
        class="bg-white shadow-sm rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
      />
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '~/stores/category'
import CategoryItem from '../components/сategoryItem.vue'

const store = useCategoryStore()
const categories = ref()

onMounted(async() => {
  await store.fetchCategories()
  categories.value = store.categories
})
</script>

<style scoped>
/* Optional: smoother hover transition for cards */
ul li {
  transition: transform 0.3s, box-shadow 0.3s;
}
ul li:hover {
  transform: translateY(-4px);
}
</style>
