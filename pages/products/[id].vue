<template>
  <div class="max-w-4xl mx-auto p-8">
    <div v-if="product" class="bg-white rounded-xl shadow p-6">
      <!-- Product image -->
      <div class="flex flex-col md:flex-row gap-6">
        <img
          :src="`http://127.0.0.1:8000/storage/${product.images?.[0]?.path}`"
          alt="Product Image"
          class="w-full md:w-1/2 max-h-[300px] rounded-lg"
        />

        <!-- Product info -->
        <div class="flex flex-col justify-between">
          <div>
            <h1 class="text-2xl font-bold mb-2">{{ product.name }}</h1>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>
            <p class="text-xl font-semibold">{{ product.price }} ₸</p>
          </div>

          
        </div>
      </div>
       <!-- Seller info -->
      <div v-if="product?.partners" class="mt-6 border-t pt-4 flex gap-3">
        <div v-for="(item, index) in product?.partners" :key="index" class="flex flex-col gap-3 p-4 border rounded-[10px]">
          <p>Дүкен {{ index +1 }}</p>
          <h3 class="font-semibold">{{ item.company_name }}</h3>
          <ProductAddModal :product="product" />
          <NuxtLink
            :to="`/sellers/${item.id}`"
            class="text-blue-600 hover:underline"
          >
            Дүкенді көру →
          </NuxtLink>
        </div> 
      </div>
    </div>

    <div v-else class="text-center py-10 text-gray-500">
      Өнім табылмады...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/useApi'
import ProductAddModal from '~/components/productAddModal.vue'

const { get } = useApi()
const route = useRoute()
const product = ref(null)

onMounted(async () => {
  try {
    const { data } = await get(`/products/${route.params.id}`)
    product.value = data
    
  } catch (e) {
    console.error(e)
  }
})
</script>
