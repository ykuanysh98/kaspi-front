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

const findInCart = (id) => cartItems.value?.find((p) => p.product_id === id ||p.id === id)

</script>

<template>
  <div class="relative pointer border rounded-xl p-4 shadow bg-white flex flex-col justify-end" @click="$router.push(`/products/${p.id}`)">
      <img :src="`http://127.0.0.1:8000/storage/${p.images?.[0]?.path}`" />
      <h2 class="font-bold text-lg">{{ p.name }}</h2>
      <p class="text-gray-700 mb-2">{{ p.price }} ₸</p>
      <div
        class="favorites absolute top-2 right-2 text-red-500"
        :class="{ 'favorites-active': p.is_favorite }"
        @click.stop="toggleFavorite(p.id)"
      >
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="228.000000pt" height="221.000000pt" viewBox="0 0 228.000000 221.000000"
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
      <ProductAddModal class="w-full" v-if="!findInCart(p.id)" :product="p" />
      <div
        v-else
        class="flex items-center justify-between border rounded-lg px-2 py-1 mt-2"
      >
        <button
          @click.stop="decrease(p.id, findInCart(p.id).partner_id)"
          class="text-xl font-bold text-gray-600 hover:text-red-600"
        >
          −
        </button>
        <span class="font-semibold">{{ findInCart(p.id).quantity }}</span>
        <button
          @click.stop="increase(p.id, findInCart(p.id).partner_id, p)"
          class="text-xl font-bold text-gray-600 hover:text-green-600"
        >
          +
        </button>
      </div>
    </div>
</template>

<style scoped>
.btn-primary {
  @apply bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg;
}
.favorites svg {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.favorites svg g {
  fill: #000; /* default color */
  transition: fill 0.3s;
}
.favorites-active svg g {
  fill: red;
}
</style>