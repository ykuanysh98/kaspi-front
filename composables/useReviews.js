import { useApi } from '@/composables/useApi'

export const useReviews = () => {
  const { get, post } = useApi()
  const reviews = ref([])

  const fetchReviews = async (partnerId) => {
    reviews.value = await get(`/partners/${partnerId}/reviews`)
  }

  const addReview = async (partnerId, data) => {
    return await post(`/partners/${partnerId}/review`, data)
  }

  return { reviews, fetchReviews, addReview }
}
