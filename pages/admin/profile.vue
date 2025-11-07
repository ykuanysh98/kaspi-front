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

onMounted(async () => {
  me.value = await get('/admin/me')
  partnerStore.setPartner(me.value)
  company_name.value = me.value.company_name
  email.value = me.value.email
})

async function save() {
  try {
    await post('/admin/me', { company_name: company_name.value, email: email.value }) // егер /admin/user болса, соны жаз
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
