import { defineStore } from 'pinia'
import { useApi } from '~/shared/api'
import type { Category } from './types'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[]
  }),
  actions: {
    async fetchCategories() {
      const { get } = useApi()
      this.categories = await get('/categories')
    }
  }
})
