import { useList as libraryList } from 'ku-ui-kit'

export function useList<T>(initial: T[] = []) {
  return libraryList(initial) as unknown as ReturnType<typeof libraryList> & {
    items: import('vue').Ref<T[]>;
    add: (item: T) => void;
    removeByIndex: (index: number) => void;
    remove: (predicate: (item: T) => boolean) => void;
    update: (predicate: (item: T) => boolean, updater: (item: T) => T) => void;
    find: (predicate: (item: T) => boolean) => T | undefined;
    clear: () => void;
    count: import('vue').ComputedRef<number>;
  }
}
