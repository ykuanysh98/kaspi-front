<script setup lang="ts">
import Header from '~/widgets/header/ui/index.vue'
import { Footer } from '~/shared/ui/footer'

import { computed } from 'vue'
import type { AxiosError } from 'axios'

import { useUserStore } from '~/entities/user'
import { usePartnerStore } from '~/entities/partner'
import { useApi } from '~/shared/api'

const userStore = useUserStore()
const partnerStore = usePartnerStore()
const { get } = useApi()

userStore.loadToken()
partnerStore.loadToken()

const url = computed(() => '/user')

interface UserResponse {
  id: number
  name?: string
  email: string
}

const loadUser = async () => {
  try {

    const res = await get<UserResponse>(url.value)
    userStore.setUser(res)

  } catch (error: unknown) {
    const err = error as AxiosError
    console.error('User жүктеу қатесі:', err.response?.data || err.message)
  }
}

loadUser()
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
