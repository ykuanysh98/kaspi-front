import axios from 'axios'
import { useUserStore } from '~/stores/user'
import { usePartnerStore } from '~/stores/partner'
import { useRuntimeConfig, useRoute } from '#app'

export const useApi = () => {
  const route = useRoute()
  const isAdmin = computed(() => route.path.startsWith('/admin'))

  const userStore = useUserStore()
  const partnerStore = usePartnerStore()
  const config = useRuntimeConfig()
  const baseURL = config.public.API_BASE || 'http://127.0.0.1:8000/api'

  // Axios instance (бір рет конфигурацияланады)
  const api = axios.create({
    baseURL,
  })

  userStore.loadToken()
  partnerStore.loadToken()

  const isTokenAdmin = computed(() => isAdmin.value ? partnerStore.token : userStore.token) 
  
  // Token бар болса, әр запросқа қосамыз
  api.interceptors.request.use((req) => {
    if (isTokenAdmin.value) {
      req.headers.Authorization = `Bearer ${isTokenAdmin.value}`
    }
    return req
  })

  const get = async (url, params = {}) => {
    try {
      const res = await api.get(url, { params })
      return res.data
    } catch (error) {
      console.error('GET error:', error.response?.data || error.message)
      throw error
    }
  }

  const post = async (url, body) => {
    try {
      const res = await api.post(url, body)
      return res.data
    } catch (error) {
      console.error('POST error:', error.response?.data || error.message)
      throw error
    }
  }

  const put = async (url, body) => {
    try {
      const res = await api.put(url, body)
      return res.data
    } catch (error) {
      console.error('PUT error:', error.response?.data || error.message)
      throw error
    }
  }

  const del = async (url) => {
    try {
      const res = await api.delete(url)
      return res.data
    } catch (error) {
      console.error('DELETE error:', error.response?.data || error.message)
      throw error
    }
  }

  return { get, post, put, del }
}
