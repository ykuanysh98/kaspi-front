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

const name = ref('')
const email = ref('')
const password = ref('')
const message = ref('')

const register = async () => {
  try {
    const res = await post('/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    message.value = 'Тіркелу сәтті ✅'

    userStore.setToken(res.token)
    userStore.setUser(res.user)
    mergeGuestCart()
    router.push('/products')
  } catch (err: unknown) {
    const error = err as Error
    message.value = 'Қате: ' + (error?.message || 'Сервер қатесі')
  }
}
</script>

<template>
  <div>
    <Input
      v-model="name"
      placeholder="Атыңыз" />
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
      @click="register"
      block>
      Тіркелу
    </Button>

    <p class="mt-2 text-sm text-gray-600 text-center">{{ message }}</p>
  </div>
</template>
