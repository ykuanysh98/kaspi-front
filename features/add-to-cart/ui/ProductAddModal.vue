<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCart } from '@/entities/cart'
import { useProductStore } from '@/entities/product'
import type { Product } from '@/entities/product'
import { Modal } from '~/shared/ui/modal'
import { formatMoney } from '~/shared/lib/format/money'
import { Quantity } from '~/shared/ui/quantity'

const { addToCart } = useCart()
const productStore = useProductStore()

interface Partner {
  id: number
  company_name: string
  name?: string
  pivot?: { price?: number; quantity?: number }
  price?: number
  quantity?: number
}

interface Props {
  product: Product
  choice?: Partner | false
}

const props = withDefaults(defineProps<Props>(), {
  choice: false
})

const show = ref(false)
const partners = ref<Partner[]>([])
const loadingPartners = ref(false)
const selectedPartner = ref<Partner | null>(null)
const quantity = ref(1)
const error = ref('')
const success = ref('')
const saving = ref(false)
const action = ref('')

onMounted(() => {
  if (props.choice) {
    selectedPartner.value = props.choice
  }
})

const open = async () => {
  show.value = true
  error.value = ''
  success.value = ''

  if (props.product.partners && props.product.partners.length) {
    partners.value = props.product.partners as unknown as Partner[]
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
    await productStore.fetchById(props.product.id)
    partners.value = (productStore.current?.partners || []) as unknown as Partner[]
    selectedPartner.value = partners.value[0] || null
  } catch (e) {
    console.error(e)
    error.value = 'Дүкендерді жүктеу мүмкін болмады'
  } finally {
    loadingPartners.value = false
  }
}

const pivotPrice = (p: Partner | null) =>
  p?.pivot?.price ?? p?.price ?? props.product.price ?? '—'

const pivotStock = (p: Partner | null) =>
  p?.pivot?.quantity ?? p?.quantity ?? null

const canSave = computed(() => {
  return !!selectedPartner.value && quantity.value > 0
})

async function handleAddToCart() {
  if (!selectedPartner.value) return
  saving.value = true
  action.value = 'cart'
  try {
    await addToCart(props.product, selectedPartner.value, quantity.value)
    success.value = 'Себетке қосылды'
    close()
  } catch {
    error.value = 'Себетке қосу мүмкін болмады'
  } finally {
    saving.value = false
  }
}

</script>

<template>
  <div>
    <button
      @click.stop="open"
      class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
      Таңдау
    </button>

    <Modal
      v-model="show"
      :title="`Тауар: ${product.name}`"
      @close="close">
      <div
        v-if="loadingPartners"
        class="py-6 text-center">Жүктелуде...</div>

      <div v-else>
        <p class="text-sm text-gray-600 mb-2">
          {{
            props.choice === false
              ? 'Дүкенді таңдаңыз:'
              : `Дүкенді: ${(props.choice as Partner).company_name}`
          }}
        </p>

        <div
          v-if="props.choice === false"
          class="max-h-40 overflow-auto space-y-2 mb-4">
          <label
            v-for="p in partners"
            :key="p.id"
            class="flex items-center gap-3 p-2 border rounded hover:bg-gray-50">
            <input
              type="radio"
              name="partner"
              :value="p"
              v-model="selectedPartner"
              class="accent-green-600"/>
            <div class="flex-1">
              <div class="font-medium">{{ p.company_name }}</div>
              <div class="text-sm text-gray-500">Баға: {{ formatMoney(pivotPrice(p)) }} ₸ · Қойма: {{ pivotStock(p) }}</div>
            </div>
          </label>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-600">Саны:</span>
            <Quantity
              v-model="quantity"
              :max="selectedPartner ? pivotStock(selectedPartner) : null" />
            <div
              v-if="selectedPartner && pivotStock(selectedPartner) !== null"
              class="text-sm text-gray-500 ml-3">
              Қойма: {{ pivotStock(selectedPartner) }}
            </div>
          </div>
          <Button
            @click="handleAddToCart"
            :disabled="!canSave"
            :loading="saving"
            variant="primary"
            class="max-w-[200px] flex-1">
            Себетке қосу
          </Button>
        </div>

        <p
          v-if="error"
          class="mt-3 text-red-600 text-sm">{{ error }}</p>
        <p
          v-if="success"
          class="mt-3 text-green-600 text-sm">{{ success }}</p>
      </div>
    </Modal>
  </div>
</template>