<script setup lang="ts">
import { useUserStore } from '~/entities/user'
import { usePartnerStore } from '~/entities/partner'
import { useCart } from '@/entities/cart'

const userStore = useUserStore()
const partnerStore = usePartnerStore()

</script>

<template>
  <header class="bg-white shadow-md border-b">
    <nav class="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">

      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition">
        🛍️ Kaspi Shop
      </NuxtLink>

      <!-- Nav Links -->
      <div class="flex flex-wrap items-center gap-4 md:gap-6 mt-3 md:mt-0">

        <NuxtLink
          to="/test"
          class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-red-600 transition">
          TEST
        </NuxtLink>

        <NuxtLink
          to="/catalog"
          class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          Каталогтар
        </NuxtLink>

        <!-- User Links -->
        <NuxtLink
          to="/products"
          class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          Тауарлар
        </NuxtLink>

        <NuxtLink
          to="/favorites"
          class="relative px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          Избранный
        </NuxtLink>

        <NuxtLink
          to="/cart"
          class="relative px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition flex items-center gap-1">
          Корзина
          <span
            v-if="useCart().cartItems.value.length"
            class="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {{ useCart().cartItems.value.length }}
          </span>
        </NuxtLink>

        <NuxtLink
          v-if="userStore.token"
          to="/orders"
          class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          Заказы
        </NuxtLink>

        <NuxtLink
          v-if="partnerStore.token || userStore.token"
          to="/profile"
          class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          Профиль
        </NuxtLink>

      </div>
    </nav>
  </header>
</template>
