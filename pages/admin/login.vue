<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePartnerStore } from '~/entities/partner'
import { useApi } from '~/shared/api'

const router = useRouter()
const partnerStore = usePartnerStore()
const { post } = useApi()

// Auth states
const isLogin = ref(true)
const email = ref('')
const company_name = ref('')
const password = ref('')
const passwordConfirm = ref('')
const error = ref('')
const success = ref('')

// 🔹 Логин
async function login() {
  error.value = ''
  try {
    const res = await post('/admin/login', {
      email: email.value,
      password: password.value
    })
    success.value = '✅ Кіру сәтті өтті'
    partnerStore.setToken(res.token)
    partnerStore.setPartner(res.partner)
    router.push('/admin')
  } catch (err) {
    error.value = '❌ Қате email немесе пароль'
  }
}

// 🔹 Регистрация
async function register() {
  error.value = ''
  success.value = ''
  if (password.value !== passwordConfirm.value) {
    error.value = 'Парольдер сәйкес емес'
    return
  }

  try {
    const res = await post('/admin/register', {
      name: company_name.value,
      company_name: company_name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirm.value
    })
    isLogin.value = true
    success.value = '✅ Тіркелу сәтті өтті, енді кіріңіз'
    partnerStore.setToken(res.token)
    partnerStore.setPartner(res.partner)
    clearForm()
    router.push('/products')
  } catch (err) {
    error.value = '❌ Бұл email бұрын қолданылған немесе сервер қатесі'
  }
}

function clearForm() {
  company_name.value = ''
  email.value = ''
  password.value = ''
  passwordConfirm.value = ''
}
</script>

<template>
  <div class="max-w-sm mx-auto mt-20 bg-white p-6 rounded-xl shadow">
    <h1 class="text-xl font-bold mb-4 text-center">
      {{ isLogin ? 'Сатушы кіру' : 'Сатушы тіркелу' }}
    </h1>

    <div v-if="!isLogin">
      <input
        v-model="company_name"
        type="text"
        placeholder="Атыңыз"
        class="input mb-2" />
    </div>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="input mb-2" />
    <input
      v-model="password"
      type="password"
      placeholder="Құпиясөз"
      class="input mb-2" />
    <div v-if="!isLogin">
      <input
        v-model="passwordConfirm"
        type="password"
        placeholder="Құпиясөзді қайталаңыз"
        class="input mb-4"/>
    </div>

    <button
      v-if="isLogin"
      @click="login"
      class="btn-primary w-full">
      Кіру
    </button>
    <button
      v-else
      @click="register"
      class="btn-primary w-full">
      Тіркелу
    </button>

    <p
      v-if="error"
      class="text-red-500 mt-3 text-center">{{ error }}</p>
    <p
      v-if="success"
      class="text-green-600 mt-3 text-center">{{ success }}</p>

    <p class="text-center text-sm mt-4 text-gray-600">
      <span v-if="isLogin">
        Тіркелмегенсіз бе?
        <button
          @click="isLogin = false"
          class="text-blue-600 underline">Тіркелу</button>
      </span>
      <span v-else>
        Аккаунтыңыз бар ма?
        <button
          @click="isLogin = true"
          class="text-blue-600 underline">Кіру</button>
      </span>
    </p>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-lg px-3 py-2;
}
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold;
}
</style>
