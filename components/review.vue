<template>
  <div class="mt-6 p-4 border">
    <h2 class="text-2xl font-bold">{{ partner.name }}</h2>

    <div class="mt-4">
      ⭐ Орташа рейтинг: {{ partner.rating?.toFixed(1) }}
      ({{ partner.reviews_count }} отзыв)
    </div>

    <div class="mt-8">
      <h3 class="font-bold text-lg mb-2">Отзывтар</h3>

      <div v-for="rev in reviews" :key="rev.id" class="border rounded p-3 mb-3">
        <p><strong>{{ rev.user.name }}</strong></p>
        <p>⭐ {{ rev.rating }}</p>
        <p class="text-gray-600">{{ rev.comment }}</p>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="font-bold text-lg mb-2">Отзыв қалдыру</h3>

      <input v-model="form.rating" type="number" min="1" max="5" class="border px-2 py-1" />
      <textarea v-model="form.comment" class="border p-2 w-full mt-2"></textarea>

      <button @click="submit" class="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
        Жіберу
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { useReviews } from '@/composables/useReviews'
import { useRoute } from 'vue-router'

const route = useRoute()
const { get } = useApi()
const { reviews, fetchReviews, addReview } = useReviews()

const partner = ref({})
const form = ref({ rating: 5, comment: '' })

onMounted(async () => {
  partner.value = await get(`/partners/${route.params.id}`)
  await fetchReviews(route.params.id)
})

async function submit() {
  await addReview(route.params.id, form.value)
  await fetchReviews(route.params.id)
  form.value.comment = ''
}
</script>
