import { defineStore } from 'pinia'
import { useCookie } from '#app'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: null
  }),

  actions: {
    setToken(newToken) {
      const tokenCookie = useCookie('token', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 күн
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })

      tokenCookie.value = newToken
      this.token = newToken
    },

    loadToken() {
      const tokenCookie = useCookie('token')
      if (tokenCookie.value) {
        this.token = tokenCookie.value
      }
    },

    clearToken() {
      const tokenCookie = useCookie('token')
      tokenCookie.value = null
      this.token = null
      this.user = null
    },

    setUser(data) {
      this.user = data
    },
    
    fetchUser(payload) {
      axios.get('user', payload)
        .then(res => this.user = res)
    }
  }
})
