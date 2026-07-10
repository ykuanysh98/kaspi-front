<script setup lang="ts">
import { ref } from 'vue'
import { useReviews } from '@/entities/review'
import type { ReviewForm } from '@/entities/review'
import { Button } from '~/shared/ui/button'
import { Textarea } from '~/shared/ui/textarea'
import { Rating } from '~/shared/ui/rating'

interface Props {
  partnerId: string | number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'submitted'): void
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
    <h3 class="font-bold text-lg mb-4 text-gray-800">Пікір қалдыру</h3>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="text-xs font-semibold text-gray-700 select-none">Бағалау</span>
        <Rating v-model="form.rating" />
      </div>

      <Textarea
        v-model="form.comment"
        placeholder="Пікіріңізді осында жазыңыз..."
        label="Пікір" />

      <div>
        <Button
          :loading="submitting"
          variant="primary"
          @click="submit">
          Жіберу
        </Button>
      </div>
    </div>

    <p
      v-if="error"
      class="text-red-600 text-sm mt-3">{{ error }}</p>
  </div>
</template>