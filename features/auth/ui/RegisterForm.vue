<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/entities/user'
import { useCart } from '@/entities/cart'
import { useApi } from '~/shared/api'

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
  } catch (err) {
    message.value = 'Қате: ' + (err?.message || 'Сервер қатесі')
  }
}
</script>

<template>
  <div>
    <input
      v-model="name"
      placeholder="Атыңыз"
      class="input" />
    <input
      v-model="email"
      placeholder="Email"
      type="email"
      class="input" />
    <input
      v-model="password"
      placeholder="Құпия сөз"
      type="password"
      class="input" />

    <UiButton
      class="mt-4"
      variant="primary"
      @click="register"
      block>
      Тіркелу
    </UiButton>

    <p class="mt-2 text-sm text-gray-600 text-center">{{ message }}</p>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-lg p-2 mb-2;
}
</style>
