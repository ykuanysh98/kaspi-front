import axios, { type AxiosInstance, type AxiosError } from 'axios'
import { useRoute, useRuntimeConfig } from '#app'
import { computed } from 'vue'
import { getToken, TOKEN_KEYS } from '../../lib/token-storage'

export const useApi = () => {
  const route = useRoute()
  const isAdmin = computed(() => route.path.startsWith('/admin'))
  const config = useRuntimeConfig()
  const baseURL =
    (config.public.API_BASE as string) || 'http://127.0.0.1:8000/api'

  const api: AxiosInstance = axios.create({ baseURL })

  const isTokenAdmin = computed(() =>
    isAdmin.value ? getToken(TOKEN_KEYS.partner) : getToken(TOKEN_KEYS.user)
  )

  api.interceptors.request.use((req) => {
    if (isTokenAdmin.value) {
      req.headers.Authorization = `Bearer ${isTokenAdmin.value}`
    }
    return req
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get = async <T = any>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<T> => {
    try {
      const res = await api.get<T>(url, { params })
      return res.data
    } catch (error) {
      const err = error as AxiosError
      console.error('GET error:', err.response?.data || err.message)
      throw error
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post = async <T = any>(url: string, body: unknown): Promise<T> => {
    try {
      const res = await api.post<T>(url, body)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      console.error('POST error:', err.response?.data || err.message)
      throw error
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const put = async <T = any>(url: string, body: unknown): Promise<T> => {
    try {
      const res = await api.put<T>(url, body)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      console.error('PUT error:', err.response?.data || err.message)
      throw error
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const del = async <T = any>(url: string): Promise<T> => {
    try {
      const res = await api.delete<T>(url)
      return res.data
    } catch (error) {
      const err = error as AxiosError
      console.error('DELETE error:', err.response?.data || err.message)
      throw error
    }
  }

  return { get, post, put, del }
}
