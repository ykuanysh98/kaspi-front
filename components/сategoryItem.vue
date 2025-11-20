<template>
  <li class="ml-4 my-2">
    <div class="flex items-center justify-between cursor-pointer" @click="handleClick">
      <span class="font-medium hover:text-blue-600">{{ category.name }}</span>
      <span v-if="category.children && category.children.length" class="ml-2">
        {{ isOpen ? '▾' : '▸' }}
      </span>
    </div>

    <ul v-if="isOpen && category.children && category.children.length">
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
