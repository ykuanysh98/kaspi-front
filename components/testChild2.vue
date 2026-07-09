<script setup lang="ts">
import { useToggle } from '@/shared/lib/use-toggle'
const { isOn, toggle, turnOn, turnOff } = useToggle()

interface Props {
  username: string
  age?: number
}

const props = withDefaults(defineProps<Props>(), {
  username: 'Guest',
  age: 18
})

const message = ref<string>('')
const isVisible = ref<boolean>(false)

const emit = defineEmits<{
  messageSent: [value: string]
}>()

// const emit2 = defineEmits<{
//   (e: 'delete', id: number): void
// }>()

function toggleVisibility() {
  isVisible.value = !isVisible.value
}

function sendMessage() {
  emit('messageSent', message.value)
  message.value = ''
}

function deleteItem(id: number) {
  // emit2('delete', id)
}

//----------

function identity<T>(arg: T):T {
  return arg
}

// Осылай жұмыс істеуі керек:
const n = identity<number>(42) // type: number
const s = identity<string>('hi') // type: string

console.log(n, s)

//----------

function makePair<T, U>(first: T, second: U) {
  return [first, second]
}

// Нәтиже типтері дәл болуы керек:
const p = makePair('age', 25)
// p[0]: string, p[1]: number

console.log(typeof p[0], typeof p[1])

//-------------
function getProperty<O,K extends keyof O>(obj: O, key:K):O[K] | void {
  return console.log(obj[key])
}

const user = { name: 'Асан', age: 30 }
getProperty(user, 'name') // OK
getProperty(user, 'email') // ERROR болуы керек

</script>

<template>
  <div>
    <h2>Username: {{ props.username }}</h2>
    <p>Age: {{ props.age }}</p>

    <button @click="toggleVisibility">
      {{ isVisible ? 'Hide' : 'Show' }} Message Input
    </button>

    <div v-if="isVisible">
      <input
        v-model="message"
        placeholder="Type a message" />
      <button @click="sendMessage">Send Message</button>
    </div>
  </div>
</template>
