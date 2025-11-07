import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [],
    loading: false,
  }),

  actions: {
    async fetchList() {
      try {
        const { get } = useApi()
        this.loading = true
        const data = await get('/products')
        this.list = data
      } catch (e) {
        console.error('Product list fetch error:', e)
      } finally {
        this.loading = false
      }
    },
  },
})
