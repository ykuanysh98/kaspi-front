<script setup>
import { computed } from 'vue'
import { useUserStore } from '~/stores/user'
import { usePartnerStore } from '~/stores/partner'
import { useCart } from '@/composables/useCart'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const partnerStore = usePartnerStore()
const { clearCart } = useCart()

const isAdmin = computed(() => route.path.startsWith('/admin'))

const logout = () => {
  if(isAdmin.value) {
    partnerStore.clearToken()
    router.push('/admin/login')
  } else {
    userStore.clearToken()
    clearCart()
    router.push('/login')
  } 
}
</script>

<template>
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="text-xl font-bold text-blue-600">🛍️ Nuxt Shop</NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink
            v-if="!isAdmin"
            to="/favorites"
            class="text-gray-700 hover:text-blue-600"
          >
            Избранный
          </NuxtLink>
          <NuxtLink
            v-if="!isAdmin"
            to="/cart"
            class="text-gray-700 hover:text-blue-600"
          >
            Корзина
          </NuxtLink>
          <NuxtLink
            v-if="!isAdmin ? userStore.token : true"
            :to="isAdmin ? '/admin/orders' : '/orders'"
            class="text-gray-700 hover:text-blue-600"
          >
            Заказы
          </NuxtLink>
          <NuxtLink
            to="/catalog"
            class="text-gray-700 hover:text-blue-600"
          >
            Каталогтар
          </NuxtLink>
          <NuxtLink
            :to="isAdmin ? '/admin/products' : '/products'"
            class="text-gray-700 hover:text-blue-600"
          >
            Тауарлар
          </NuxtLink>
          <NuxtLink
            v-if="!isAdmin && userStore.user?.role === 'admin'"
            to="/sellers"
            class="text-gray-700 hover:text-blue-600"
          >
            Ползователи
          </NuxtLink>
          <NuxtLink
            v-if="isAdmin && partnerStore.partner?.role === 'admin'"
            to="/admin/partners"
            class="text-gray-700 hover:text-blue-600"
          >
            Продавцы
          </NuxtLink>
          <NuxtLink
            v-if="isAdmin ? !partnerStore.token : !userStore.token"
            :to="isAdmin ? '/admin/login' : '/login'"
            class="text-gray-700 hover:text-blue-600"
          >
            Кіру
          </NuxtLink>
          <button
            v-if="isAdmin ? partnerStore.token : userStore.token"
            @click="logout"
            class="text-red-600 font-medium hover:underline"
          >
            Шығу
          </button>
          <NuxtLink
            v-if="partnerStore.token || userStore.token"
            :to="isAdmin ? '/admin/profile' : '/profile'"
            class="text-gray-700 hover:text-blue-600"
          >
            Профиль
          </NuxtLink>
        </div>
      </nav>
    </header>
</template>