import { useToggle as libraryToggle } from "ku-ui-kit";

export function useToggle(initial: boolean = false) {
  return libraryToggle(initial);
}
