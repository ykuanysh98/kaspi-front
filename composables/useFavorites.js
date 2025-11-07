import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import { useProductStore } from '~/stores/product'

const favorites = ref([])

export const useFavorites = () => {
  const { get, post } = useApi() 
const productStore = useProductStore()
  const fetchFavorites = async () => {
    try {
      favorites.value = await get('/favorites')
      
    } catch (e) {
      console.error(e)
    }
  }

  const toggleFavorite = async (productId) => {
    try {
      await post('/favorites/toggle', { product_id: productId })
      await fetchFavorites()
      await productStore.fetchList()
    } catch (e) {
      console.error(e)
    }
  }


  return { favorites, fetchFavorites, toggleFavorite }
}
