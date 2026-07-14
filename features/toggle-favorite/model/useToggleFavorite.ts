import { useFavorites } from '@/entities/favorite'
import { useProductStore } from '~/entities/product'

export const useToggleFavorite = () => {
  const { toggleFavorite: toggle, fetchFavorites } = useFavorites()
  const productStore = useProductStore()

  const toggleFavorite = async (productId: number) => {
    await toggle(productId)
    await productStore.fetchList()
  }

  return { toggleFavorite, fetchFavorites }
}
