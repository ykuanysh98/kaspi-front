import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useDebounce } from '@/composables/useDebounce'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [],
    loading: false,
    filters: {
      search: '',
      category_id: null,
      min_price: null,
      max_price: null,
      partner_id: null,
      favorites_only: false,
      sort: null,
    },
    meta: null
  }),

  actions: {
    async fetchList(page = 1) {
      try {
        const { get } = useApi()
        this.loading = true

        const query = new URLSearchParams(
          Object.fromEntries(
            Object.entries(this.filters).filter(
              ([, v]) => v !== null && v !== '' && v !== false
            )
          )
        )
        const res = await get(`/products?page=${page}&${query.toString()}`)
        
        this.list = res.data
        this.meta = {
          current_page: res.current_page,
          last_page: res.last_page,
          per_page: res.per_page,
          total: res.total
        }
      } catch (e) {
        console.error('Product list fetch error:', e)
      } finally {
        this.loading = false
      }
    },
    setFilter(key, value) {
      this.filters[key] = value
    },
    resetFilters() {
      this.filters = {
        search: '',
        category_id: null,
        min_price: null,
        max_price: null,
        partner_id: null,
        favorites_only: false
      }
    }
  },
})
