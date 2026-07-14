import { defineStore } from 'pinia'
import { useCookie } from '#app'
import { useApi } from '@/shared/api'
import type { Partner } from './types'
import { TOKEN_KEYS } from '~/shared/lib/token-storage'

export const usePartnerStore = defineStore('partner', {
  state: () => ({
    token: null as string | null,
    partner: null as Partner | null,
    current: null as Partner | null
  }),

  actions: {
    setToken(newToken: string) {
      const tokenCookie = useCookie(TOKEN_KEYS.partner, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })

      tokenCookie.value = newToken
      this.token = newToken
    },

    loadToken() {
      const tokenCookie = useCookie<string | null>(TOKEN_KEYS.partner)
      if (tokenCookie.value) {
        this.token = tokenCookie.value
      }
    },

    clearToken() {
      const tokenCookie = useCookie<string | null>(TOKEN_KEYS.partner)
      tokenCookie.value = null
      this.token = null
      this.partner = null
    },

    setPartner(data: Partner) {
      this.partner = data
    },

    async fetchById(id: string | number) {
      const { get } = useApi()
      try {
        this.current = await get(`/partners/${id}`)
      } catch (e) {
        console.error('Partner fetch error:', e)
      }
    }
  }
})
