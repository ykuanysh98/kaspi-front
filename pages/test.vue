<script lang="ts" setup>
import { ref, computed } from 'vue'

import { useCounter } from '~/shared/lib/use-counter'
const { count, doubled, increment, reset } = useCounter(10)

import { useList } from '@/shared/lib/use-list'
const {
  items: users,
  add,
  remove,
  update,
  find
} = useList<User>()

const name = ref<string>('')

// Type alias
type User = {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' // union type
  url: string
}

// Interface
interface Product {
  id: number
  title: string
  price: number
  inStock: boolean
}

// 2. API fetch функциясы
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url)
  return res.json() as T
}

// const user = await fetchData<User>('/api/user/1')
// const list = await fetchData<Product[]>('/api/products')

// ------------ IGNORE ---

function getFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}
</script>

<template>
  <div>
    {{ user?.url }}
    <div>{{ doubled }}</div>

    {{ getFirst<number>([1, 2, 3]) }}
    {{ getFirst<string>(['a','b']) }}
    {{ getFirst([true, false]) }}

    <hr />

    <TestChild
      :title="name"
      :count="count"
      :items="['a', 'b']"
      @increment="increment"
      @reset="reset"/>

    <TestChild2
      :username="name"
      :age="30"
      @messageSent="msg => console.log('Message from child:', msg)"/>
  </div>
</template>