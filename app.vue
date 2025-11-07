<script setup >
import { onMounted } from 'vue'

import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user' 
import { usePartnerStore } from '~/stores/partner'
import { useApi } from '@/composables/useApi'
 
const userStore = useUserStore()
const partnerStore = usePartnerStore()
const { get } = useApi()

const route = useRoute()

userStore.loadToken()
partnerStore.loadToken()

const isAdmin = computed(() => route.path.startsWith('/admin'))

const url = isAdmin.value ? '/admin/me' : '/user'
  try {
    const res = await get(url)
    isAdmin.value ? partnerStore.setPartner(res) : userStore.setUser(res)
    
  } catch (error) {
    console.error('User жүктеу қатесі:', error.response?.data || error.message)
  }
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header/>
    <main class="flex-1 mt-40 container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
.container {
  @apply max-w-6xl;
}
</style>
