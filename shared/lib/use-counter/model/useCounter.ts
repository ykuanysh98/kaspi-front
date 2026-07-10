import { useCounter as libraryCounter } from "ku-ui-kit";

export function useCounter(initial: number = 0) {
  return libraryCounter(initial);
}
