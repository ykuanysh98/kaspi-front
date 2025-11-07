<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import Multiselect from '../../../../components/multiselect.vue' 

const route = useRoute()
const router = useRouter()
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
  const {data} = await get(`/products/${route.params.id}`)
  product.value = data

  const partnersRes = await get('/admin/partners')
  partners.value = partnersRes.data ?? partnersRes
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

</script>

<template>
  <div class="p-6 max-w-xl mx-auto bg-white rounded-lg shadow">
    <h1 class="text-xl font-bold mb-4">✏️ Өнімді өзгерту</h1>

    <form @submit.prevent="update" class="space-y-4">
      <!-- Негізгі өрістер -->
      <div>
        <label class="block text-sm font-medium mb-1">Атауы</label>
        <input v-model="product.name" type="text" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Бағасы</label>
        <input v-model="product.price" type="number" class="input" required />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Саны</label>
        <input v-model="product.quantity" type="number" class="input" min="0" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Сипаттамасы</label>
        <textarea v-model="product.description" class="input" rows="3"></textarea>
      </div>

      <!-- Суреттер -->
      <div>
        <label class="block text-sm font-medium mb-1">Суреттер</label>
        <input type="file" accept="image/*" @change="handleFileChange" class="block w-full" />
        <p v-if="uploading" class="text-blue-600 text-sm mt-1">Сурет жүктеліп жатыр...</p>
      </div>

      <!-- Бар суреттер -->
      <div v-if="product.images.length" class="flex flex-wrap gap-2 mt-2">
        <div v-for="img in product.images" :key="img.id" class="relative">
          <img
            :src="`http://127.0.0.1:8000/storage/${img.path}`"
            class="w-24 h-24 object-cover rounded border"
          />
          <button
            type="button"
            @click="deleteImage(img.id)"
            class="absolute top-1 right-1 bg-red-600 text-white px-1 rounded text-xs"
          >
            ×
          </button>
        </div>
      </div>

      <button class="btn-primary w-full mt-4">Жаңарту</button>
    </form>

    <!-- Партнерлар --> 
    <h1 class="mt-6">Партнеры</h1>
    <div class="flex gap-3">
      <Multiselect
        v-model="partnerIds"
        :options="options"
        multiple
        searchable
        clearable
        placeholder="Таңдаңыз..."
        @change="handleChange()"
      />
      <button class="px-3 btn-primary" @click="savePartners()">
        Сохранить
      </button>
    </div>

  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-lg p-2;
}
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold;
}
</style>
