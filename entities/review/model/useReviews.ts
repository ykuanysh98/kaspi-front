import { ref } from 'vue'
import { useApi } from '@/shared/api'
import type { Review, ReviewForm } from './types'

export function useReviews() {
  const { get, post } = useApi()
  const reviews = ref<Review[]>([])

  const fetchReviews = async (partnerId: string | number): Promise<void> => {
    try {
      reviews.value = await get(`/partners/${partnerId}/reviews`)
    } catch (e) {
      console.error('Fetch reviews error:', e)
    }
  }

  const addReview = async (partnerId: string | number, data: ReviewForm) => {
    try {
      return await post(`/partners/${partnerId}/review`, data)
    } catch (e) {
      console.error('Add review error:', e)
      throw e
    }
  }

  return { reviews, fetchReviews, addReview }
}
