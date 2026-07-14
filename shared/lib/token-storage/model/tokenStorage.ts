import { useCookie } from '#app'
import { TOKEN_KEYS as libraryKeys } from 'ku-ui-kit'

export const TOKEN_KEYS = libraryKeys

export const getToken = (key: string): string | null => {
  const cookie = useCookie<string | null>(key)
  return cookie.value ?? null
}
