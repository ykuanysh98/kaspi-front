<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/entities/user'
import { usePartnerStore } from '~/entities/partner'
import { useApi } from '~/shared/api'

const { get, post, del } = useApi()
const userStore = useUserStore()
const partnerStore = usePartnerStore()
const router = useRouter()
const route = useRoute()

const activeTab = ref('my') // 'my' | 'active'
const products = ref([])
const productsPartner = ref([])

const isAdmin = computed(() => route.path.startsWith('/admin'))

async function loadProducts() {
  if (activeTab.value === 'my') {
    // Өз өнімдері
    const { data } = await get(`/products?partner_id=${partnerStore.partner.id}`)
    productsPartner.value = data
    products.value = data
  } else if (activeTab.value === 'active') {
    // Барлық активный өнімдер
    const { data } = await get('/products?status=active')
    products.value = data
  } else {
    // Барлық активный өнімдер
    const { data } = await get('/products?status=inactive')
    products.value = data
  }
}

onMounted(loadProducts)
watch(activeTab, loadProducts)

async function deleteProduct(id) {
  if (!confirm('Өшіргіңіз келе ме?')) {
    return
  }

  await del(`/admin/products/${id}`, userStore.token)

  products.value = products.value.filter(p => p.id !== id)
}

const approveJoin = async (id) => {
  await post(`/admin/products/${id}/join-request`)
  const { data } = await get(`/products?partner_id=${partnerStore.partner.id}`)
  productsPartner.value = data
}

const removeProduct = async (id) => {
  await post(`/admin/products/${id}/remove`)
  const { data } = await get(`/products?partner_id=${partnerStore.partner.id}`)
  productsPartner.value = data
}
</script>

<template>
  <div class="p-6">

    <!-- TAB BAR -->
    <div class="flex gap-4 mb-6 border-b pb-2">
      <button
        :class="['px-4 py-2', activeTab === 'my' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500']"
        @click="activeTab = 'my'">
        Өз өнімдері
      </button>

      <button
        :class="['px-4 py-2', activeTab === 'active' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500']"
        @click="activeTab = 'active'">
        Бүкіл активный өнімдер
      </button>

      <button
        :class="['px-4 py-2', activeTab === 'inactive' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500']"
        @click="activeTab = 'inactive'">
        Бүкіл неактивный өнімдер
      </button>
    </div>

    <!-- Header actions -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">🛠️ Өнімдер</h1>

      <div class="flex gap-3">
        <button
          v-if="activeTab === 'my'"
          @click="router.push('/admin/products/new')"
          class="btn-primary">
          + Жаңа өнім
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <table class="min-w-full bg-white border rounded-lg shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Атауы</th>
          <th class="p-3 text-left">Изображение</th>
          <th class="p-3 w-[200px] text-left">Описание</th>
          <th class="p-3 text-left">Число</th>
          <th class="p-3 text-left">Бағасы</th>
          <th class="p-3 text-left">Активный</th>
          <th class="p-3">Әрекет</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="p in products"
          :key="p.id"
          class="border-b align-top">
          <td class="p-3">{{ p.id }}</td>
          <td class="p-3">{{ p.name }}</td>

          <td class="p-3 flex flex-col gap-3">
            <img
              class="w-[100px]"
              v-for="(item, index) in p.images"
              :key="index"
              :src="`http://127.0.0.1:8000/storage/${item.path}`"/>
          </td>

          <td class="p-3 w-[200px] word-break">{{ p.description }}</td>
          <td class="p-3">{{ p.quantity }}</td>
          <td class="p-3">{{ p.price }} ₸</td>
          <td class="p-3">{{ p.status === 'active' ? 'Да' : 'Нет' }}</td>

          <td class="p-3 text-center">
            <button
              @click="router.push(`/admin/products/${p.id}/edit`)"
              class="w-full text-blue-600 hover:underline mr-2"
              v-if="activeTab === 'my'|| activeTab === 'inactive'">
              Өзгерту
            </button>

            <button
              @click="deleteProduct(p.id)"
              class="w-full text-red-600 hover:underline"
              v-if="activeTab === 'my'">
              Жою
            </button>

            <button
              @click="approveJoin(p.id)"
              class="w-full text-green-600 hover:underline"
              v-if="activeTab === 'active' && !productsPartner.some(e=>e.id===p.id)">
              Қосылу
            </button>
            <span
              v-if="activeTab === 'active' && p.status === 'pending' && productsPartner.some(e=>e.id===p.id)"
              class="text-yellow-600 font-semibold">
              Тексерілуде...
            </span>

            <button
              v-if="activeTab === 'active' && productsPartner.some(e=>e.id===p.id)"
              @click="removeProduct(p.id)"
              class="text-red-600 hover:underline">
              Өшіру
            </button>
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
