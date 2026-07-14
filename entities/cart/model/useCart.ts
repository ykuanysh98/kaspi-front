import { ref, computed } from 'vue'
import { AxiosError } from 'axios'
import { useApi } from '~/shared/api'
import { useUserStore } from '~/entities/user'
import type { CartItem, CartProduct, PartnerLike } from './types'

const cartItems = ref<CartItem[]>([])

export function useCart() {
  const { get, post } = useApi()
  const userStore = useUserStore()

  userStore.loadToken()

  const loadCart = async (): Promise<void> => {
    if (userStore.token) {
      try {
        cartItems.value = await get('/cart')
      } catch (e) {
        console.error('Cart load error:', e)
      }
    } else {
      const saved = localStorage.getItem('cart')
      if (saved) {
        cartItems.value = JSON.parse(saved)
      }
    }
  }

  const saveLocal = (): void => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const updateCart = async (
    productId: number,
    partnerId: number | undefined,
    quantity = 1,
    price?: number
  ): Promise<void> => {
    const item = cartItems.value.find(
      (p) => p.id === productId || p.product_id === productId
    )

    if (
      item &&
      item.product?.partners.find((e) => e.id === partnerId)?.pivot.quantity ===
        item.quantity
    ) {
      return
    }

    if (userStore.token) {
      try {
        const formData = new FormData()
        formData.append('product_id', String(productId))
        formData.append('partner_id', String(partnerId))
        formData.append('quantity', String(quantity))
        formData.append('price', String(+(price ?? 0)))

        await post('/cart/add', formData)
        await loadCart()
      } catch (e) {
        console.error('Cart update error:', e)
        alert((e as AxiosError<{ message?: string }>)?.response?.data?.message)
      }
    } else if (item) {
      item.quantity += quantity
      if (item.quantity <= 0) {
        cartItems.value = cartItems.value.filter((p) => p !== item)
      }
      saveLocal()
    } else if (quantity > 0) {
      cartItems.value.push({ product_id: productId, quantity })
      saveLocal()
    }
  }

  const addToCart = (
    product: CartProduct,
    partner: PartnerLike,
    quantity?: number
  ): Promise<void> =>
    updateCart(product.id, partner.id, quantity ?? 1, partner.pivot?.price)

  const increase = (
    productId: number,
    partnerId: number,
    product: CartProduct
  ): Promise<void> =>
    updateCart(
      productId,
      partnerId,
      1,
      product.partners?.find((e) => e.id === partnerId)?.pivot.price ??
        product.price
    )

  const decrease = async (
    productId: number,
    partnerId?: number
  ): Promise<void> => {
    const item = cartItems.value.find(
      (p) =>
        p.product_id === productId ||
        (p.id === productId && p.partner_id === partnerId)
    )
    if (!item) return

    if (userStore.token) {
      try {
        const newQty = 1

        if (item.quantity > 0) {
          const formData = new FormData()
          formData.append('product_id', String(productId))
          formData.append('partner_id', String(partnerId))
          formData.append('quantity', String(newQty))

          await post('/cart/decrease', formData)
        }

        await loadCart()
      } catch (e) {
        console.error('Decrease error:', e)
      }
    } else {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        cartItems.value = cartItems.value.filter((p) => p.id !== productId)
      }
      saveLocal()
    }
  }

  const mergeGuestCart = async (): Promise<void> => {
    const guestCart = localStorage.getItem('cart')

    if (userStore.token && guestCart) {
      try {
        const parsed: CartItem[] = JSON.parse(guestCart)
        await post('/merge-cart', {
          guest_cart: parsed.map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity
          }))
        })
        localStorage.removeItem('cart')
        await loadCart()
      } catch (e) {
        console.error('Merge cart error:', e)
      }
    }
  }

  const clearCart = (): void => {
    cartItems.value = []
    loadCart()
  }

  const totalPrice = computed(() =>
    cartItems.value.reduce((sum, p) => sum + (p.price || 0) * p.quantity, 0)
  )

  return {
    cartItems,
    addToCart,
    increase,
    decrease,
    mergeGuestCart,
    loadCart,
    clearCart,
    totalPrice
  }
}
