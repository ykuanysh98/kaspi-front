<script setup lang="ts">
// 1. Өнім (Product) интерфейсі:
interface Product {
  id: number
  title: string
  price: number
  inStock: boolean
}

// 2. Props интерфейсі:
// ТАПСЫРМА: ComponentProps интерфейсіне 'product' деген кіріс айнымалысын (prop)
// және оның типі 'Product' болатындай етіп анықтаңыз.
interface ComponentProps {
  product: Product;
  // Өз кодыңызды осында жазыңыз:
}

// default мәндерін қалдырмасақ та болады, тек props объектісін жасаңыз:
const props = defineProps<ComponentProps>()

// 3. Emits жиынтығы:
// ТАПСЫРМА: Осы компонент мынадай оқиғаларды жібере алатындай етіп
// `ComponentEmits` типін анықтаңыз (call-signature немесе tuple форматы):
// - 'add-to-cart': параметрі ретінде productId (number) және quantity (number) алады.
// - 'toggle-favorite': параметрі ретінде productId (number) алады.
//
// Нұсқау:
// type ComponentEmits = {
//   (e: 'event-name', param: type): void
// }
// немесе
// type ComponentEmits = {
//   'event-name': [param: type, param2: type]
// }
type ComponentEmits = {
    (e: 'add-to-cart', productId: number, quantity: number): void
    (e: 'toggle-favorite', productId: number): void
  // Өз кодыңызды осында жазыңыз:
}

const emit = defineEmits<ComponentEmits>()

// --- ТЕКСЕРУ ФУНКЦИЯЛАРЫ (Бұл жерге тиіспеңіз) ---
function handleCart() {
  emit('add-to-cart', props.product.id, 1) // Бұл өріс қате көрсетпеу керек!
}

function handleFavorite() {
  emit('toggle-favorite', props.product.id) // Бұл өріс те қате көрсетпеу керек!
}
</script>

<template>
  <div class="border p-4 rounded bg-white shadow-sm">
    <h3 class="text-lg font-bold">{{ props.product?.title }}</h3>
    <p class="text-gray-500">${{ props.product?.price }}</p>
    <div class="mt-4 flex gap-2">
      <button
        :disabled="!props.product?.inStock"
        @click="handleCart"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
        Себетке салу
      </button>
      <button
        @click="handleFavorite"
        class="px-4 py-2 border rounded">
        Таңдаулы
      </button>
    </div>
  </div>
</template>
