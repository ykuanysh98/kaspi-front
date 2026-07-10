import { defineStore } from "pinia";
import { useCookie } from "#app";
import axios from "axios";
import type { User } from "./types";
import { useApi } from "~/shared/api";

export const USER_TOKEN_COOKIE = "token-kaspi";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
    usersList: [] as User[],
  }),

  actions: {
    setToken(newToken: string) {
      const tokenCookie = useCookie(USER_TOKEN_COOKIE, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      tokenCookie.value = newToken;
      this.token = newToken;
    },

    loadToken() {
      const tokenCookie = useCookie<string | null>(USER_TOKEN_COOKIE);
      if (tokenCookie.value) {
        this.token = tokenCookie.value;
      }
    },

    clearToken() {
      const tokenCookie = useCookie<string | null>(USER_TOKEN_COOKIE);
      tokenCookie.value = null;
      this.token = null;
      this.user = null;
    },

    setUser(data: User) {
      this.user = data;
    },

    async fetchUser(payload?: unknown) {
      const res = await axios.get("user", payload as any);
      this.user = res.data;
    },

    async fetchUsersList() {
      const { get } = useApi();
      try {
        this.usersList = await get("/users");
      } catch (err) {
        console.error("Users list fetch error:", err);
        throw err;
      }
    },

    async updateProfile(form: { name: string; email: string }) {
      const { post, get } = useApi();
      try {
        await post("/user", form);
        const res = await get("/user");
        this.setUser(res as User);
      } catch (err) {
        console.error("Profile update error:", err);
        throw err;
      }
    },
  },
});
