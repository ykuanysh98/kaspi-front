<script setup lang="ts">
import { useToggle } from '@/composables/useCounter'
const { isOn, toggle, turnOn, turnOff } = useToggle()

interface Props {
  username: string
  age?: number 
}

const props =withDefaults(defineProps<Props>(), {
  username: 'Guest',
  age: 18
})

const message = ref<string>('')
const isVisible = ref<boolean>(false)

const emit = defineEmits<{
  messageSent: [value: string]
}>()

const emit2 = defineEmits<{
  (e: 'delete', id: number): void
}>()

function toggleVisibility() {
  isVisible.value = !isVisible.value
}

function sendMessage() {
  emit('messageSent', message.value)
  message.value = ''
}

function deleteItem(id: number) {
  emit2('delete', id)
}
</script>

<template>
  <div>
    <h2>Username: {{ props.username }}</h2>
    <p>Age: {{ props.age }}</p>

    <button @click="toggleVisibility">
      {{ isVisible ? 'Hide' : 'Show' }} Message Input
    </button>

    <div v-if="isVisible">
      <input v-model="message" placeholder="Type a message" />
      <button @click="sendMessage">Send Message</button>
    </div>
  </div>
</template>
