<script setup>
import { useCart } from '@/composables/useCart'
import { useFavorites } from '@/composables/useFavorites'

const { cartItems, addToCart, increase, decrease } = useCart()
const { toggleFavorite } = useFavorites()

defineProps({
  p: {
    type: Object,
    required: true,
  },
})

const findInCart = (id) => cartItems.value?.find((p) => p.product_id === id || p.id === id)

const getProductImage = (path) => {
  if (!path) return null;

  // Егер сыртқы URL болса (http немесе https)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Әйтпесе локальный storage ішіндегі файл
  return `http://127.0.0.1:8000/storage/${path}`;
};

</script>

<template>
  <div
    class="min-w-[200px] relative pointer bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transform transition duration-300 ease-in-out flex flex-col justify-between overflow-hidden"
  >
    <!-- Product Image -->
    <div class="relative w-full h-48 md:h-56 overflow-hidden cursor-pointer" @click="$router.push(`/products/${p.id}`)">
      <img
        :src="getProductImage(p.images?.[0]?.path)"
        alt="product image"
        class="w-full h-full object-cover"
      />

      <!-- Favorite Icon -->
      <div
        class="absolute top-2 right-2 text-red-500"
        :class="{ 'favorites-active': p.is_favorite }"
        @click.stop="toggleFavorite(p.id)"
      >
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="20pt" height="20pt" viewBox="0 0 228.000000 221.000000"
          preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,221.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
              <path d="M575 2085 c-227 -50 -398 -199 -483 -423 -24 -61 -26 -80 -26 -217 0
              -137 2 -156 26 -217 42 -111 87 -176 199 -288 58 -58 265 -270 459 -472 342
              -358 353 -368 390 -368 37 0 48 10 391 368 193 202 400 414 458 472 112 112
              157 177 199 288 24 61 26 80 26 217 0 137 -2 156 -26 217 -98 257 -317 420
              -583 435 -149 8 -318 -42 -426 -128 l-39 -31 -39 31 c-133 106 -353 154 -526
              116z m296 -204 c78 -30 155 -88 213 -160 27 -33 52 -61 56 -61 4 0 29 28 56
              61 90 112 206 176 339 186 215 17 412 -116 478 -321 27 -86 26 -203 -2 -288
              -28 -84 -63 -133 -165 -233 -45 -44 -186 -188 -312 -320 -357 -374 -387 -405
              -394 -405 -4 0 -137 136 -296 302 -159 166 -339 352 -399 413 -120 121 -154
              169 -181 260 -61 207 38 443 226 540 115 60 266 70 381 26z"/>
            </g>
        </svg>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4 flex flex-col gap-2">
      <h2 class="font-bold text-lg text-gray-800 truncate">{{ p.name }}</h2>
      <p class="text-gray-700 font-semibold">{{ p.price }} ₸</p>
      <p class="text-gray-700 font-semibold">{{ p.partners?.[0]?.pivot.quantity || 0 }} шт.</p>

      <!-- Add to Cart / Quantity -->
      <div v-if="!findInCart(p.id)">
        <ProductAddModal class="w-full" :product="p" />
      </div>
      <div
        v-else
        class="flex items-center justify-between border rounded-lg px-2 py-1 mt-2 bg-gray-50"
      >
        <button
          @click.stop="decrease(p.id, findInCart(p.id).partner_id)"
          class="text-xl font-bold text-gray-600 hover:text-red-600 transition"
        >
          −
        </button>
        <span class="font-semibold text-gray-800">{{ findInCart(p.id).quantity }}</span>
        <button
          @click.stop="increase(p.id, findInCart(p.id).partner_id, p)"
          class="text-xl font-bold text-gray-600 hover:text-green-600 transition"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modern Add to Cart Button */
.btn-primary {
  @apply bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200;
}

/* Favorites Icon */
.favorites svg {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.favorites svg g {
  fill: #000;
  transition: fill 0.3s;
}
.favorites-active svg g {
  fill: red;
}
</style>
