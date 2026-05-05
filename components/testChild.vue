<script setup lang="ts">
interface Props {
  title: string
  count?: number 
  items: string[]
}

// Default values
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// Emits типі
const emit = defineEmits<{
  increment: [value: number] 
  reset: [] 
}>()

// Қолдану
function handleClick() {
  emit('increment', props.count + 1)
}

function handleReset() {
  emit('reset')
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ props.count }}</p>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <button @click="handleClick">Increment</button>
    <button @click="handleReset">Reset</button>
  </div>
</template>