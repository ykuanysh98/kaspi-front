<!--
  Тапсырма 5.1: ProductFetcher Component (API және Routing Mocking)

  Тапсырма: Осы компонентке тест жазыңыз.
  Бұл жерде сізге сыртқы `axios` кітапханасын және Nuxt/Vue Router-дің `useRoute` хугын моктау керек!

  Нұсқау:
  ```typescript
  import { vi, describe, it, expect } from 'vitest'
  import { mount } from '@vue/test-utils'
  import axios from 'axios'
  import ProductFetcher from './ProductFetcher.vue'

  // 1. axios-ты моктау
  vi.mock('axios')

  // 2. useRoute хугын моктау (мысалы id = 123)
  vi.mock('vue-router', () => ({
    useRoute: () => ({
      params: { id: '123' }
    })
  }))

  describe('ProductFetcher', () => {
    it('shows loader and then product data', async () => {
      // axios.get функциясы жалған жауап қайтаратын етіп баптау:
      vi.mocked(axios.get).mockResolvedValueOnce({
        data: { id: 123, title: 'Mocked Phone', price: 500 }
      })

      const wrapper = mount(ProductFetcher)
      expect(wrapper.text()).toContain('Жүктелуде...')

      // Асинхронды үдерістердің және DOM-ның жаңаруын күту:
      await new Promise(resolve => setTimeout(resolve, 0))
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Mocked Phone')
    })
  })
  ```

  Тексерілетін жағдайлар:
  1. Компонент іске қосылғанда әуелі "Жүктелуде..." мәтіні көріне ме?
  2. API сәтті болғанда өнім атауы, бағасы шыға ма және "Жүктелуде" сөзі жоғала ма?
  3. API сәтсіз (қатемен) аяқталғанда "Қате орын алды" деген хабарлама көріне ме?
-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Product {
  id: number
  title: string
  price: number
}

const route = useRoute()
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await axios.get<Product>(`/api/products/${id}`)
    product.value = response.data
  } catch (err: unknown) {
    error.value = (err as Error).message || 'Қате орын алды'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
    <div
      v-if="loading"
      class="text-gray-500 animate-pulse">Жүктелуде...</div>
    <div
      v-else-if="error"
      class="text-red-500 font-bold">{{ error }}</div>
    <div v-else-if="product">
      <h2 class="text-xl font-bold">{{ product.title }}</h2>
      <p class="text-gray-600">${{ product.price }}</p>
    </div>
  </div>
</template>
