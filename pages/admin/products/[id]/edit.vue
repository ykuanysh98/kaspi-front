<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { usePartnerStore } from '~/stores/partner'
import Multiselect from '../../../../components/multiselect.vue' 

const route = useRoute()
const router = useRouter()
const partnerStore = usePartnerStore()
const { get, post, del } = useApi()

const product = ref({
  id: null,
  name: '',
  price: '',
  description: '',
  quantity: 0,
  images: [] // базаға сақталған суреттер (url/path, id)
})

const options = computed(()=>{
  return partners.value.map(e=>({
    label: e.company_name,
    value: e.id
  }))
})

const partners = ref([])
const partnerIds = ref([])
const uploading = ref(false)

onMounted(async () => {
  const { data } = await get(`/products/${route.params.id}`)
  product.value = data

  const partnersRes = await get('/admin/partners')
  
  partners.value = partnersRes.data ?? partnersRes
  console.log('partnersRes', partners.value);
  partnerIds.value = product.value.partners.map(e => e.id)
})

async function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  uploading.value = true
    const formData = new FormData()
    formData.append('image', file)
    try {
      const res = await post(`/admin/products/${product.value.id}/images`, formData)
      product.value.images.push(res.image)
    } catch (e) {
      alert('❌ Қате: ' + e.response.data?.message)
    } finally {
      uploading.value = false
    }

}

async function deleteImage(imageId) {
  if (!confirm('Суретті өшіру керек пе?')) return
  await del(`/admin/product/images/${imageId}`)
  product.value.images = product.value.images.filter(i => i.id !== imageId)
}

async function update() {
    const formData = new FormData()
    formData.append('name', product.value.name)
    formData.append('price', product.value.price)
    formData.append('description', product.value.description)
    formData.append('quantity', product.value.quantity)
    formData.append('partner_id', partnerStore.partner.id)

    try {
      await post(`/admin/products/${product.value.id}`, formData)
      router.push('/admin')
    } catch (e) {
      console.error('❌ Қате:', e)
    } 
}

const handleChange = async (val) => {
  partnerIds.value = val
}

const savePartners = async (val) => {
  const formData = new FormData()
  partnerIds.value.forEach(e => {
    formData.append('partner_id[]', e)
  }) 
  try {
    await post(`/admin/products/${route.params.id}/partners`, formData)
  } catch (e) {
    console.error('❌ Қате:', e)
  } 
}

const activateProduct = async (val) => {
  try {
    await post(`/admin/products/${route.params.id}/request-activation`)
  } catch (e) {
    console.error('❌ Қате:', e)
  } 
}

</script>

<template>
  <div class="max-w-3xl mx-auto p-6">

    <!-- Header -->
    <div class="bg-white rounded-xl shadow p-6 mb-6 border border-gray-100">
      <h1 class="text-2xl font-bold text-gray-800 mb-1">🛠 Өнімді редакциялау</h1>
      <p class="text-gray-500 text-sm">Өнім мәліметтерін өзгерту, суреттерді басқару және партнерларды қосу</p>
    </div>

    <!-- Product Form -->
    <div class="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-5">

      <!-- Product Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label class="form-label">Атауы</label>
          <input v-model="product.name" type="text" class="form-input" />
        </div>

        <div>
          <label class="form-label">Бағасы</label>
          <input v-model="product.price" type="number" class="form-input" />
        </div>

        <div>
          <label class="form-label">Саны</label>
          <input v-model="product.quantity" type="number" min="0" class="form-input" />
        </div>

        <div class="md:col-span-2">
          <label class="form-label">Сипаттамасы</label>
          <textarea v-model="product.description" rows="4" class="form-input"></textarea>
        </div>
      </div>

      <!-- Images -->
      <div class="mt-4">
        <label class="form-label">Жаңа сурет жүктеу</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          class="form-input cursor-pointer"
        />
        <p v-if="uploading" class="text-blue-600 text-sm mt-2 animate-pulse">
          Жүктелуде...
        </p>
      </div>

      <!-- Existing Images -->
      <div v-if="product.images?.length" class="mt-4">
        <label class="form-label">Бар суреттер</label>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
          <div
            v-for="img in product.images"
            :key="img.id"
            class="relative group rounded-xl overflow-hidden border shadow-sm"
          >
            <img
              :src="`http://127.0.0.1:8000/storage/${img.path}`"
              class="w-full h-32 object-cover"
            />

            <!-- Delete Button -->
            <button
              @click="deleteImage(img.id)"
              class="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <button class="btn-primary w-full mt-4" @click="update">
        💾 Өзгерістерді сақтау
      </button>

    </div>

    <!-- Partners -->
    <div class="bg-white rounded-xl shadow border border-gray-100 mt-8 p-6">
      <h2 class="text-lg font-semibold mb-3">🤝 Партнерлар</h2>

      <div class="flex gap-3 items-start">
        <Multiselect
          v-model="partnerIds"
          :options="options"
          multiple
          searchable
          clearable
          placeholder="Партнер таңдаңыз..."
          class="flex-1"
          @change="handleChange"
        />

        <button class="btn-primary whitespace-nowrap px-6" @click="savePartners">
          Сақтау
        </button>
      </div>
    </div>

    <!-- Activation Request -->
    <div v-if="product.status!=='active'" class="bg-white rounded-xl shadow border border-gray-100 mt-8 p-6">
      <button class="btn-success w-full" @click="activateProduct">
        🚀 Өнімді активацияға жіберу
      </button>
    </div>

  </div>
</template>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold shadow-sm transition;
}

.btn-success {
  @apply bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold shadow-sm transition;
}
</style>

