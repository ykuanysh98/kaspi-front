<template>
  <div>
    <!-- Primary button in product card -->
    <button @click.stop="open" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
      Таңдау
    </button>

    <!-- Modal -->
    <teleport to="body">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/50" @click="close"></div>

        <div class="relative bg-white rounded-lg w-full max-w-xl mx-4 p-6 z-10 shadow-lg">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Сатып алушы: {{ product.name }}</h3>
            <button @click="close" class="text-gray-500 hover:text-gray-800">✕</button>
          </div>

          <!-- Partners list -->
          <div v-if="loadingPartners" class="py-6 text-center">Жүктелуде...</div>

          <div v-else>
            <p class="text-sm text-gray-600 mb-2">Дүкенді таңдаңыз:</p>

            <div class="max-h-40 overflow-auto space-y-2 mb-4">
              <label
                v-for="p in partners"
                :key="p.id"
                class="flex items-center gap-3 p-2 border rounded hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="partner"
                  :value="p"
                  v-model="selectedPartner"
                  class="accent-green-600"
                />
                <div class="flex-1">
                  <div class="font-medium">{{ p.company_name }}</div>
                  <div class="text-sm text-gray-500">Баға: {{ pivotPrice(p) }} ₸ · Қойма: {{ pivotStock(p) }}</div>
                </div>
              </label>
            </div>

            <!-- Quantity -->
            <div class="flex items-center gap-3 mb-4">
              <span class="text-sm text-gray-600">Саны:</span>
              <div class="flex items-center border rounded">
                <button @click="decrease" class="px-3 py-1">−</button>
                <div class="px-4">{{ quantity }}</div>
                <button @click="increase" class="px-3 py-1">+</button>
              </div>
              <div v-if="selectedPartner && pivotStock(selectedPartner) !== null" class="text-sm text-gray-500 ml-3">
                Қойма: {{ pivotStock(selectedPartner) }}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <button
                @click="handleAddToCart"
                :disabled="!canSave || saving"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-60"
              >
                {{ saving && action === 'cart' ? 'Сақталуда...' : 'Себетке қосу' }}
              </button>

              <button
                @click="handleBuyNow"
                :disabled="!canSave || saving"
                class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded disabled:opacity-60"
              >
                {{ saving && action === 'checkout' ? 'Өтініш...' : 'Тікелей тапсырыс' }}
              </button>
            </div>

            <p v-if="error" class="mt-3 text-red-600 text-sm">{{ error }}</p>
            <p v-if="success" class="mt-3 text-green-600 text-sm">{{ success }}</p>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import { useCart } from '@/composables/useCart'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user' // егер Pinia store қолдансаң
const { addToCart } = useCart()

// props: product object (must contain id, name; product.partners maybe undefined)
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const show = ref(false)
const partners = ref([]) // partners with pivot if available
const loadingPartners = ref(false)
const selectedPartner = ref(null)
const quantity = ref(1)
const error = ref('')
const success = ref('')
const saving = ref(false)
const action = ref('') // 'cart' or 'checkout'

const { get, post } = useApi()
const router = useRouter()
const userStore = useUserStore ? useUserStore() : null

const open = async () => {
  show.value = true
  error.value = ''
  success.value = ''
  // load partners for this product
  // If product already has partners loaded — use them, else fetch
  if (props.product.partners && props.product.partners.length) {
    partners.value = props.product.partners
    // default select first
    selectedPartner.value = partners.value[0] || null
  } else {
    await loadPartnersFromApi()
  }
}

const close = () => {
  show.value = false
  quantity.value = 1
  selectedPartner.value = null
  saving.value = false
  action.value = ''
}

async function loadPartnersFromApi() {
  loadingPartners.value = true
  try {
    // GET /products/{id} должен вернуть partners pivot
    const res = await get(`/products/${props.product.id}`)
    // If your useApi returns res.data vs res, adapt accordingly.
    // Assume get returns full data (res.product or res)
    const prod = res.product ?? res
    partners.value = prod.partners || []
    selectedPartner.value = partners.value[0] || null
  } catch (e) {
    console.error(e)
    error.value = 'Дүкендерді жүктеу мүмкін болмады'
  } finally {
    loadingPartners.value = false
  }
}

const pivotPrice = (p) => {
  // pivot can be p.pivot.price or p.price depending how fetched
  return (p?.pivot?.price ?? p?.price ?? props.product.price ??'—')
}
const pivotStock = (p) => {
  return (p?.pivot?.stock ?? p?.stock ?? null)
}

const increase = () => {
  // check stock
  if (selectedPartner.value && pivotStock(selectedPartner.value) !== null) {
    if (quantity.value < pivotStock(selectedPartner.value)) quantity.value++
  } else {
    quantity.value++
  }
}
const decrease = () => {
  if (quantity.value > 1) quantity.value--
}

const canSave = computed(() => {
  return !!selectedPartner.value && quantity.value > 0 && props.product.quantity
})

// save logic: only triggered by user pressing add/buy buttons
async function saveToCartOnServer(payload) {
  // expect API: POST /cart/add with FormData or JSON. adapt if your API uses /cart
  const formData = new FormData()
  formData.append('product_id', payload.product_id)
  formData.append('partner_id', payload.partner_id)
  formData.append('quantity', payload.quantity)

  // if your API returns cart data, you can use it
  const res = await post('/cart/add', formData)
  return res
}

function saveToLocal(payload) {
  const raw = localStorage.getItem('cart')
  let cart = raw ? JSON.parse(raw) : []
  // store product_id, partner_id, quantity, price, name...
  const existing = cart.find(i => i.product_id === payload.product_id && i.partner_id === payload.partner_id)
  if (existing) {
    existing.quantity += payload.quantity
  } else {
    cart.push({
      product_id: payload.product_id,
      partner_id: payload.partner_id,
      quantity: payload.quantity,
      price: payload.price ?? null,
      product_name: props.product.name,
      partner_name: selectedPartner.value?.name ?? null
    })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  return cart
}

async function handleAddToCart() {
  console.log(props.product, selectedPartner.value);
  
  await addToCart(props.product, selectedPartner.value, quantity.value)
  router.push('/cart')
}

async function handleBuyNow() {
  await addToCart(props.product, selectedPartner.value, quantity.value)
  router.push('/checkout')
}
</script>
