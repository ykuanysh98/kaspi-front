<template> categories
  <template v-for="cat in categories" :key="cat.id">
    <option :value="cat.id">
      {{ '— '.repeat(level) }}{{ cat.name }}
    </option>

    <CategorySelectItem 
      v-if="cat.children && cat.children.length" 
      :categories="cat.children" 
      :level="level + 1" 
    />
  </template>
</template>

<script setup>
import CategorySelectItem from './сategorySelectItem.vue'
defineProps({
  categories: { type: Array, required: true },
  level: { type: Number, default: 0 }
})
</script>
