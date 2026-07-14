import { defineStore } from 'pinia'
import { useApi } from '@/shared/api'
import type { Product, ProductFilters, ProductListMeta } from './types'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [] as Product[],
    loading: false,
    current: null as Product | null,
    filters: {
      search: '',
      category_id: null,
      min_price: null,
      max_price: null,
      partner_id: null,
      favorites_only: false,
      sort: null
    } as ProductFilters,
    meta: null as ProductListMeta | null
  }),

  actions: {
    async fetchById(id: string | number) {
      try {
        const { get } = useApi()
        this.loading = true
        const res = await get(`/products/${id}`)
        this.current = res.data
      } catch (e) {
        console.error('Product fetch error:', e)
      } finally {
        this.loading = false
      }
    },

    async fetchList(page = 1) {
      try {
        const { get } = useApi()
        this.loading = true

        const query = new URLSearchParams(
          Object.fromEntries(
            Object.entries(this.filters).filter(
              ([, v]) => v !== null && v !== '' && v !== false
            ) as [string, string][]
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

    setFilter<K extends keyof ProductFilters>(
      key: K,
      value: ProductFilters[K]
    ) {
      this.filters[key] = value
    },

    resetFilters() {
      this.filters = {
        search: '',
        category_id: null,
        min_price: null,
        max_price: null,
        partner_id: null,
        favorites_only: false,
        sort: null
      }
    }
  }
})
