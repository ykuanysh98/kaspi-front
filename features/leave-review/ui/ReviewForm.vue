<script setup lang="ts">
import { ref } from 'vue'
import { useReviews } from '@/entities/review'
import type { ReviewForm } from '@/entities/review'

interface Props {
  partnerId: string | number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submitted: []
}>()

const { addReview } = useReviews()

const form = ref<ReviewForm>({ rating: 5, comment: '' })
const submitting = ref(false)
const error = ref('')

async function submit() {
  submitting.value = true
  error.value = ''
  try {
    await addReview(props.partnerId, form.value)
    form.value.comment = ''
    form.value.rating = 5
    emit('submitted')
  } catch {
    error.value = 'Пікір жіберу мүмкін болмады'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="mt-8">
    <h3 class="font-bold text-lg mb-2">Отзыв қалдыру</h3>

    <input
      v-model.number="form.rating"
      type="number"
      min="1"
      max="5"
      class="border px-2 py-1" />
    <textarea
      v-model="form.comment"
      class="border p-2 w-full mt-2"></textarea>

    <button
      @click="submit"
      :disabled="submitting"
      class="bg-blue-600 text-white px-4 py-2 mt-2 rounded disabled:opacity-60">
      {{ submitting ? 'Жіберілуде...' : 'Жіберу' }}
    </button>

    <p
      v-if="error"
      class="text-red-600 text-sm mt-2">{{ error }}</p>
  </div>
</template>