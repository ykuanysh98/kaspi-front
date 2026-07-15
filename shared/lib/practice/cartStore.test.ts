import { setActivePinia, createPinia } from "pinia";
import { beforeEach, describe, it, expect } from "vitest";
import { useCartStore } from "./cartStore";

describe("Cart Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("adds items", () => {
    const store = useCartStore();
    store.addItem({ id: 1, title: "Item 1", price: 100 });
    expect(store.totalCount).toBe(1);
  });
});
