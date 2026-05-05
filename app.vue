<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AxiosError } from 'axios'

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
const url = computed(() => isAdmin.value ? '/admin/me' : '/user')

interface UserResponse {
  id: number
  name?: string
  email: string
}

interface PartnerResponse extends UserResponse {
  company_name: string[]
}

const loadUser = async () => {
  try { 

    if (isAdmin.value) {
      const res = await get<PartnerResponse>(url.value)
      partnerStore.setPartner(res) 
    } else {
      const res = await get<UserResponse>(url.value)
      userStore.setUser(res)
    }

  } catch (error: unknown) {
    const err = error as AxiosError
    console.error('User жүктеу қатесі:', err.response?.data || err.message)
  }
}

await loadUser()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header/>
    <main class="flex-1 mt-40   mx-auto px-4 py-8">
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
