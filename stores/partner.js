import { defineStore } from 'pinia'
import { useCookie } from '#app'
import axios from 'axios'

export const usePartnerStore = defineStore('partner', {
  state: () => ({
    token: null,
    partner: null
  }),

  actions: {
    setToken(newToken) {
      const tokenCookie = useCookie('token-admin', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 күн
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })

      tokenCookie.value = newToken
      this.token = newToken
    },

    loadToken() {
      const tokenCookie = useCookie('token-admin')
      if (tokenCookie.value) {
        this.token = tokenCookie.value
      }
    },

    clearToken() {
      const tokenCookie = useCookie('token-admin')
      tokenCookie.value = null
      this.token = null
      this.partner = null
    },

    setPartner(data) {
      this.partner = data
    },
  }
})
