<script setup>
import { ref, onMounted } from 'vue'
const { get, post, del } = useApi()

const tab = ref('activation')
const activationRequests = ref([])
const joinRequests = ref([])

const loadActivation = async () => {
  const data = await get('/admin/activation-requests')
  activationRequests.value = data
}

const loadJoinRequests = async () => {
  const data = await get('/admin/partner-join-requests')
  joinRequests.value = data
}

// ---- ACTIONS ----

const approveActivation = async (id) => {
  await post(`/admin/products/${id}/approve`)
  loadActivation()
}

const rejectActivation = async (id) => {
  await post(`/admin/products/${id}/reject`)
  loadActivation()
}

const approveJoin = async (id) => {
  await post(`/admin/partner-join-requests/${id}/approve`)
  loadJoinRequests()
}

const rejectJoin = async (id) => {
  await post(`/admin/partner-join-requests/${id}/reject`)
  loadJoinRequests()
}

onMounted(() => {
  loadActivation()
  loadJoinRequests()
})
</script>

<template>
  <div class="p-6">

    <!-- TAB SWITCH -->
    <div class="flex gap-4 border-b mb-6">
      <button
        class="pb-2"
        :class="tab === 'activation' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500'"
        @click="tab = 'activation'"
      >
        Активация запросы
      </button>

      <button
        class="pb-2"
        :class="tab === 'join' ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500'"
        @click="tab = 'join'"
      >
        Қосылу запросы
      </button>
    </div>

    <!-- ACTIVATION REQUESTS -->
    <div v-if="tab === 'activation'">
      <h2 class="text-xl font-semibold mb-3">Өз өнімдерін активныйларға қосу</h2>

      <div
        v-for="item in activationRequests"
        :key="item.id"
        class="border p-4 rounded mb-3 flex justify-between items-center"
      >
        <div>
          <p><b>Партнер Өнімі:</b> {{ item.product?.name }}</p>
          <p><b>Партнер:</b> {{ item.partner?.name }}</p>
          <p><b>Status:</b> {{ item.status }}</p>
        </div>

        <div class="flex gap-2">
          <button 
            @click="approveActivation(item.product.id)"
            class="px-3 py-1 bg-green-600 text-white rounded"
          >
            Қосу
          </button>

          <button 
            @click="rejectActivation(item.product.id)"
            class="px-3 py-1 bg-red-600 text-white rounded"
          >
            Отказ
          </button>
        </div>
      </div>
    </div>

    <!-- JOIN REQUESTS -->
    <div v-else>
      <h2 class="text-xl font-semibold mb-3">Активный өнімдерге қосылу</h2>

      <div
        v-for="item in joinRequests"
        :key="item.id"
        class="border p-4 rounded mb-3 flex justify-between items-center"
      >
        <div>
          <p><b>Активный Өнім:</b> {{ item.product?.name }}</p>
          <p><b>Партнер:</b> {{ item.partner?.name }}</p>
          <p><b>Status:</b> {{ item.status }}</p>
        </div>

        <div class="flex gap-2">
          <button 
            @click="approveJoin(item.id)"
            class="px-3 py-1 bg-green-600 text-white rounded"
          >
            Қосу
          </button>

          <button 
            @click="rejectJoin(item.id)"
            class="px-3 py-1 bg-red-600 text-white rounded"
          >
            Отказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
