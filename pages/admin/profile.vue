<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { usePartnerStore } from '~/stores/partner'

const { get, post } = useApi()
const partnerStore = usePartnerStore()

const me = ref(null)
const company_name = ref('')
const email = ref('')
const success = ref(false)

const isAdmin = true // админ бетінде тек админ жүреді

async function logout() {
  partnerStore.clearToken()
  router.push('/admin/login')
}

onMounted(async () => {
  me.value = await get('/admin/me')
  partnerStore.setPartner(me.value)

  company_name.value = me.value.company_name
  email.value = me.value.email
})

async function save() {
  try {
    await post('/admin/me', {
      company_name: company_name.value,
      email: email.value
    })

    success.value = true
    setTimeout(() => (success.value = false), 2000)
  } catch (err) {
    console.error(err)
    alert('❌ Қате шықты')
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto bg-white p-6 rounded-xl shadow mt-10">

    <!-- 🔹 ЖОҒАРЫ ҚАТАР КІРУ/ШЫҒУ + ПОЛЬЗОВАТЕЛИ -->
    <div class="flex justify-between mb-6">
      <!-- Пользователи -->
      <NuxtLink
        v-if="partnerStore.partner?.company_name === 'admin'"
        to="/admin/partners"
        class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition"
      >
        Продавцы
      </NuxtLink>

      <NuxtLink
        v-if="partnerStore.partner?.company_name === 'admin'"
        to="/admin/requests"
        class="px-3 py-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 transition"
      >
        Запросы
      </NuxtLink>

      <!-- Шығу -->
      <button
        v-if="partnerStore.token"
        @click="logout"
        class="px-3 py-2 rounded-md text-red-600 font-medium hover:text-white hover:bg-red-600 transition"
      >
        Шығу
      </button>
    </div>

    <!-- ПРОФИЛЬ -->
    <h1 class="text-2xl font-bold mb-4">👤 Менің профилім</h1>

    <div v-if="me">
      <label class="block mb-2 font-medium">Аты:</label>
      <input v-model="company_name" type="text" class="input mb-4" />

      <label class="block mb-2 font-medium">Email:</label>
      <input v-model="email" type="email" class="input mb-4" />

      <button @click="save" class="btn-primary w-full">Сақтау</button>
      <p v-if="success" class="text-green-600 text-center mt-3">✅ Сәтті жаңартылды</p>
    </div>

    <div v-else>
      <p>Жүктеліп жатыр...</p>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded-lg px-3 py-2;
}
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg;
}
</style>
