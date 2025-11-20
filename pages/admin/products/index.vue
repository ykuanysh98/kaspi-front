<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { usePartnerStore } from '~/stores/partner'
import { useApi } from '@/composables/useApi'

const { get, del } = useApi()
const userStore = useUserStore()
const partnerStore = usePartnerStore()

const products = ref([])
const router = useRouter()
const route = useRoute()

const isAdmin = computed(() => route.path.startsWith('/admin'))

onMounted(async () => {
  const { data } = await get(`/products?partner_id=${partnerStore.partner.id}`)
  products.value = data 
  
  if(isAdmin.value && partnerStore.partner && partnerStore.partner?.company_name === 'admin') {
    const { data } = await get('/products')
    products.value = data
  }
  console.log(partnerStore.partner);
})

async function deleteProduct(id) {
  if (!confirm('Өшіргіңіз келе ме?')) {
    return
  }

  await del(`/admin/products/${id}`, userStore.token)
  
  products.value = products.value.filter(p => p.id !== id)
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">🛠️ Өнімдер</h1>
      <button v-if="userStore.user?.role === 'admin'" @click="router.push('/admin/users')" class="btn-info">Қолданушылар</button>
      <button @click="router.push('/admin/products/new')" class="btn-primary">+ Жаңа өнім</button>
    </div>

    <table class="min-w-full bg-white border rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Атауы</th>
          <th class="p-3 text-left">Изабражение</th>
          <th class="p-3 w-[200px] text-left">Описание</th>
          <th class="p-3 text-left">Число</th>
          <th class="p-3 text-left">Бағасы</th>
          <th class="p-3 text-left">Активный</th>
          <th class="p-3">Әрекет</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id" class="border-b align-top">
          <td class="p-3">{{ p.id }}</td>
          <td class="p-3">{{ p.name }}</td>
          <td class="p-3 flex flex-col gap-3">
            <img class="w-[100px]" v-for="(item, index) in p.images" :key="index" :src="`http://127.0.0.1:8000/storage/${item.path}`" />
          </td>
          <td class="p-3 w-[200px] word-break">{{ p.description }}</td>
          <td class="p-3">{{ p.quantity }}</td>
          <td class="p-3">{{ p.price }} ₸</td>
          <td class="p-3">{{ p.status==='active' ? 'Да' : 'Нет' }} </td>
          <td class="p-3 text-center">
            <button @click="router.push(`/admin/products/${p.id}/edit`)" class="w-full text-blue-600 hover:underline mr-2">Өзгерту</button>
            <button @click="deleteProduct(p.id)" class="w-full text-red-600 hover:underline">Жою</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.btn-primary {
  @apply bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg;
}
.btn-info {
  @apply bg-blue-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg;
}
</style>
