<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'

const { get, post } = useApi()
const userStore = useUserStore()
const router = useRouter()

const form = ref({ name: '', email: '' })

onMounted(async () => {
  form.value.name = userStore.user.name
  form.value.email = userStore.user.email
})

const save = async () => {
  await post('/user', form.value)
  const res = await get('/user')
  userStore.setUser(res)

  router.push('/profile')
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-4">Профильді өзгерту</h1>

    <div class="flex flex-col gap-4">
      <input v-model="form.name" type="text" placeholder="Аты" class="border p-2 rounded" />
      <input v-model="form.email" type="email" placeholder="Email" class="border p-2 rounded" />

      <button @click="save" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        Сақтау
      </button>
    </div>
  </div>
</template>
