<script setup lang="ts">
import { onMounted } from 'vue'
import { usePartnerStore } from '@/entities/partner'
import { useReviews } from '@/entities/review'
import { ReviewForm } from '@/features/leave-review'

interface Props {
  partnerId: string | number
}

const props = defineProps<Props>()

const partnerStore = usePartnerStore()
const { reviews, fetchReviews } = useReviews()

const refreshReviews = () => fetchReviews(props.partnerId)

onMounted(async () => {
  await partnerStore.fetchById(props.partnerId)
  await refreshReviews()
})
</script>

<template>
  <div class="mt-6 p-4 border">
    <h2 class="text-2xl font-bold">{{ partnerStore.current?.name }}</h2>

    <div class="mt-4">
      ⭐ Орташа рейтинг: {{ partnerStore.current?.rating }}
      ({{ partnerStore.current?.reviews_count }} отзыв)
    </div>

    <div class="mt-8">
      <h3 class="font-bold text-lg mb-2">Отзывтар</h3>

      <div
        v-for="rev in reviews"
        :key="rev.id"
        class="border rounded p-3 mb-3">
        <p><strong>{{ rev.user.name }}</strong></p>
        <p>⭐ {{ rev.rating }}</p>
        <p class="text-gray-600">{{ rev.comment }}</p>
      </div>
    </div>

    <ReviewForm
      :partnerId="props.partnerId"
      @submitted="refreshReviews" />
  </div>
</template>