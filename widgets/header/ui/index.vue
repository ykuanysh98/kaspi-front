<script setup lang="ts">
import { useUserStore } from '~/entities/user'
import { usePartnerStore } from '~/entities/partner'
import { useCart } from '@/entities/cart'
import { useMyI18n } from '~/shared/lib/i18n'

const userStore = useUserStore()
const partnerStore = usePartnerStore()
const { locale, setLocale, t } = useMyI18n()
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
          {{ t('catalog') }}
        </NuxtLink>

        <!-- User Links -->
        <NuxtLink
          to="/products"
          class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          {{ t('products') }}
        </NuxtLink>

        <NuxtLink
          to="/favorites"
          class="relative px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          {{ t('favorites') }}
        </NuxtLink>

        <NuxtLink
          to="/cart"
          class="relative px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition flex items-center gap-1">
          {{ t('cart') }}
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
          {{ t('orders') }}
        </NuxtLink>

        <NuxtLink
          v-if="userStore.token"
          to="/chat"
          class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          {{ t('chat') }}
        </NuxtLink>

        <NuxtLink
          v-if="partnerStore.token || userStore.token"
          to="/profile"
          class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition">
          {{ t('profile') }}
        </NuxtLink>

        <!-- Language Switcher -->
        <div class="flex gap-1 border-s ps-4 ms-2">
          <button
            @click="setLocale('kk')"
            :class="['px-2 py-1 text-xs rounded font-bold', locale === 'kk' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100']">
            KK
          </button>
          <button
            @click="setLocale('ru')"
            :class="['px-2 py-1 text-xs rounded font-bold', locale === 'ru' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100']">
            RU
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
