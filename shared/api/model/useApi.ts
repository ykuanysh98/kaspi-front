import axios, { type AxiosInstance } from "axios";
import { useRoute, useRuntimeConfig } from "#app";
import { computed } from "vue";
import { getToken, TOKEN_KEYS } from "../../lib/token-storage";

export const useApi = () => {
  const route = useRoute();
  const isAdmin = computed(() => route.path.startsWith("/admin"));
  const config = useRuntimeConfig();
  const baseURL =
    (config.public.API_BASE as string) || "http://127.0.0.1:8000/api";

  const api: AxiosInstance = axios.create({ baseURL });

  const isTokenAdmin = computed(() =>
    isAdmin.value ? getToken(TOKEN_KEYS.partner) : getToken(TOKEN_KEYS.user),
  );

  api.interceptors.request.use((req) => {
    if (isTokenAdmin.value) {
      req.headers.Authorization = `Bearer ${isTokenAdmin.value}`;
    }
    return req;
  });

  const get = async <T = any>(
    url: string,
    params: Record<string, unknown> = {},
  ): Promise<T> => {
    try {
      const res = await api.get<T>(url, { params });
      return res.data;
    } catch (error: any) {
      console.error("GET error:", error.response?.data || error.message);
      throw error;
    }
  };

  const post = async <T = any>(url: string, body: unknown): Promise<T> => {
    try {
      const res = await api.post<T>(url, body);
      return res.data;
    } catch (error: any) {
      console.error("POST error:", error.response?.data || error.message);
      throw error;
    }
  };

  const put = async <T = any>(url: string, body: unknown): Promise<T> => {
    try {
      const res = await api.put<T>(url, body);
      return res.data;
    } catch (error: any) {
      console.error("PUT error:", error.response?.data || error.message);
      throw error;
    }
  };

  const del = async <T = any>(url: string): Promise<T> => {
    try {
      const res = await api.delete<T>(url);
      return res.data;
    } catch (error: any) {
      console.error("DELETE error:", error.response?.data || error.message);
      throw error;
    }
  };

  return { get, post, put, del };
};
