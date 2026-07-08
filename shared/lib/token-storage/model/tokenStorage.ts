import { useCookie } from "#app";

export const TOKEN_KEYS = {
  user: "token-kaspi",
  partner: "token-kaspi-admin",
} as const;

export const getToken = (key: string): string | null => {
  const cookie = useCookie<string | null>(key);
  return cookie.value ?? null;
};
