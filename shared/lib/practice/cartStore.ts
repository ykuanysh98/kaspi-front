/**
 * Тапсырма 4.1: Cart Store (Pinia тестілеу)
 *
 * Тапсырма: Осы Pinia дүкеніне (store) тест жазыңыз.
 * Тексерілетін жағдайлар:
 * 1. Бастапқы кезде себет бос бола ма (`items: []`, `totalCount: 0`, `totalPrice: 0`)?
 * 2. Себетке тауар қосқанда (`addItem`), себеттегі тауар саны арта ма, және сол тауар себетке қосыла ма?
 * 3. Егер бір тауарды бірнеше рет қоссақ, оның саны (`quantity`) ғана артып, жаңа тауар есебінде қосылмай ма?
 * 4. Баға және саны өзгергенде `totalPrice` және `totalCount` getters мәндері дұрыс есептеліне ме?
 * 5. Тауарды өшіргенде (`removeItem`), ол тізімнен жоғала ма?
 * 6. Себетті тазалағанда (`clearCart`), барлық мәліметтер қалпына келе ме?
 *
 * Нұсқау:
 * Тест ішінде Pinia-ны іске қосу үшін:
 * ```typescript
 * import { setActivePinia, createPinia } from 'pinia'
 * import { beforeEach, describe, it, expect } from 'vitest'
 * import { useCartStore } from './cartStore'
 *
 * describe('Cart Store', () => {
 *   beforeEach(() => {
 *     setActivePinia(createPinia()) // Әр тест алдында Pinia-ны жаңадан орнатамыз
 *   })
 *
 *   it('adds items', () => {
 *     const store = useCartStore()
 *     store.addItem({ id: 1, title: 'Item 1', price: 100 })
 *     expect(store.totalCount).toBe(1)
 *   })
 * })
 * ```
 */

import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export const useCartStore = defineStore("cart-practice", () => {
  const items = ref<CartItem[]>([]);

  const totalCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  });

  function addItem(product: Omit<CartItem, "quantity">) {
    const existing = items.value.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  }

  function removeItem(productId: number) {
    items.value = items.value.filter((item) => item.id !== productId);
  }

  function clearCart() {
    items.value = [];
  }

  return {
    items,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
  };
});
