<template>
  <li class="ml-4 my-2">
    <!-- Category header -->
    <div 
      class="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-blue-50 transition"
      @click="handleClick"
    >
      <span class="font-medium text-gray-800 hover:text-blue-600">{{ category.name }}</span>
      <span v-if="category.children && category.children.length" class="ml-2 text-gray-500">
        <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>

    <!-- Nested children -->
    <ul v-if="isOpen && category.children && category.children.length" class="pl-4 border-l border-gray-200 mt-1">
      <CategoryItem 
        v-for="child in category.children" 
        :key="child.id" 
        :category="child" 
      />
    </ul>
  </li>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CategoryItem from './сategoryItem.vue'

const props = defineProps({
  category: Object
})

const router = useRouter()
const isOpen = ref(false)

const handleClick = () => {
  if (props.category.children && props.category.children.length) {
    // ішкі категория болса ашу/жабу
    isOpen.value = !isOpen.value
  } else {
    // соңғы категория (leaf)
    router.push({ path: '/products', query: { category_id: props.category.id } })
  }
}
</script>

<style scoped>
/* Smooth open/close transition for nested list */
ul {
  transition: all 0.3s ease;
}
</style>
