import { useDebounce as libraryDebounce } from 'ku-ui-kit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  return libraryDebounce(fn, delay) as (...args: Parameters<T>) => void
}
