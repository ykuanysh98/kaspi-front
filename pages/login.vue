<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useCart } from '@/composables/useCart'
import { useApi } from '@/composables/useApi'

const router = useRouter()
const userStore = useUserStore()
const { mergeGuestCart } = useCart()
const { post } = useApi()

// form states
const isLogin = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')
const message = ref('')

// 🔹 Кіру
const login = async () => {
  try {
    const res = await post('/login', { email: email.value, password: password.value })
    message.value = 'Кіру сәтті ✅'

    userStore.setToken(res.token)
    userStore.setUser(res.user)
    mergeGuestCart()
    router.push('/products')
  } catch (err) {
    message.value = 'Қате логин немесе пароль'
  }
}

// 🔹 Тіркелу
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
  <div class="flex justify-center items-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold mb-4 text-center">
        {{ isLogin ? 'Кіру' : 'Тіркелу'   }}
      </h1>

      <div v-if="!isLogin">
        <input
          v-model="name"
          placeholder="Атыңыз"
          class="input" />
      </div>

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
        @click="isLogin ? login() : register"
        block>
        {{isLogin ? 'Кіру' : 'Тіркелу'}}
      </UiButton>

      <p class="mt-2 text-sm text-gray-600 text-center">{{ message }}</p>

      <div class="text-center mt-4">
        <button
          @click="isLogin = !isLogin"
          class="text-blue-600 hover:underline text-sm">
          {{ isLogin ? 'Тіркелу бетіне өту' : 'Кіру бетіне өту' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-lg p-2 mb-2;
}
</style>
