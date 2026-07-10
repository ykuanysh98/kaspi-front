<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/entities/user'
import { useCart } from '@/entities/cart'
import { useApi } from '~/shared/api'
import { Button } from '~/shared/ui/button'
import { Input } from '~/shared/ui/input'

const router = useRouter()
const userStore = useUserStore()
const { mergeGuestCart } = useCart()
const { post } = useApi()

const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
  try {
    const res = await post('/login', { email: email.value, password: password.value })
    message.value = 'Кіру сәтті ✅'

    userStore.setToken(res.token)
    userStore.setUser(res.user)
    mergeGuestCart()
    router.push('/products')
  } catch {
    message.value = 'Қате логин немесе пароль'
  }
}
</script>

<template>
  <div>
    <Input
      v-model="email"
      placeholder="Email"
      type="email" />
    <Input
      v-model="password"
      placeholder="Құпия сөз"
      type="password" />

    <Button
      class="mt-4"
      variant="primary"
      @click="login"
      block>
      Кіру
    </Button>

    <p class="mt-2 text-sm text-gray-600 text-center">{{ message }}</p>
  </div>
</template>
