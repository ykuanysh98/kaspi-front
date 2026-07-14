import { ref } from 'vue'
import { useApi } from '@/shared/api'
import type { FavoriteItem } from './types'

const favorites = ref<FavoriteItem[]>([])

export const useFavorites = () => {
  const { get, post } = useApi()

  const fetchFavorites = async (): Promise<void> => {
    try {
      favorites.value = await get('/favorites')
    } catch (e) {
      console.error(e)
    }
  }

  const toggleFavorite = async (productId: number): Promise<void> => {
    try {
      await post('/favorites/toggle', { product_id: productId })
      await fetchFavorites()
    } catch (e) {
      console.error(e)
    }
  }

  return { favorites, fetchFavorites, toggleFavorite }
}
