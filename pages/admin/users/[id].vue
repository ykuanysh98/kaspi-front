<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'

const { get, put } = useApi()
const route = useRoute()
const router = useRouter()
const user = ref(null)
const orders = ref(null)

// Форма деректері
const form = ref({
  name: '',
  email: '',
  password: '',
  role: ''
})

onMounted(async () => {
  const {data} = await get(`/users/${route.params.id}`)
  user.value = data

  form.value.name = user.value.name
  form.value.email = user.value.email
  form.value.role = user.value.role || 'user'
})

const save = async () => {
  try {
    const updated = await put(`/admin/users/${route.params.id}`, form.value)
    alert('✅ Қолданушы жаңартылды')
    user.value = updated.user
    router.push('/admin/users') // немесе қалу, қалауыңыз бойынша
  } catch (err) {
    console.error(err)
    alert('❌ Жаңарту мүмкін болмады')
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-4">Қолданушы мәліметі</h1>

    <div v-if="user">
      <div class="flex flex-col gap-4">
        <input v-model="form.name" type="text" placeholder="Аты" class="border p-2 rounded" />
        <input v-model="form.email" type="email" placeholder="Email" class="border p-2 rounded" />
        <input v-model="form.password" type="password" placeholder="Жаңа құпия сөз (қалауы бойынша)" class="border p-2 rounded" />
        <select v-model="form.role" class="border p-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="seller">Seller</option>
        </select>

        <button @click="save" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Жаңарту
        </button>
      </div>

      <div class="mt-6 border-t pt-4">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Қазіргі рөл:</strong> {{ user.role }}</p>
      </div>

      <div class="mt-6">
        <h2 class="my-3">Заказы: </h2>
      <div
        v-for="order in user?.orders"
        :key="order.id"
        class="border rounded p-4 mb-4 shadow bg-white"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold">Тапсырыс #{{ order.id }}</span>
          <span class="text-gray-500">{{ new Date(order.created_at).toLocaleString() }}</span>
        </div>

        <div v-for="item in order.items" :key="item.id" class="flex justify-between mb-1">
          <span>{{ item.product.name }} x {{ item.quantity }}</span>
          <span>{{ item.price * item.quantity }} ₸</span>
        </div>

        <div class="mt-2 font-bold text-right">
          Жалпы: {{ order.total }} ₸
        </div>

        <div class="mt-2">
          <span
            :class="{
              'text-green-600': order.status === 'completed',
              'text-yellow-600': order.status === 'pending',
              'text-red-600': order.status === 'canceled'
            }"
          >
            Статус: {{ order.status }}
          </span>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
