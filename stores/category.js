import { defineStore } from 'pinia'
import { useApi } from '~/shared/api'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: []
  }),
  actions: {
    async fetchCategories() {
      const { get } = useApi()
      this.categories = await get('/categories')
    }
  }
})
