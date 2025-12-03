import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import { useUserStore } from '~/stores/user'
 
const cartItems = ref([])

export function useCart() {
  const { get, post } = useApi()
  const userStore = useUserStore()

  userStore.loadToken()

  const loadCart = async () => {
    if (userStore.token) {
      try { 
        cartItems.value = await get('/cart') 
      }
      catch (e) { 
        console.error('Cart load error:', e) 
      }
    } else {
      const saved = localStorage.getItem('cart')
      if (saved) {
        cartItems.value = JSON.parse(saved)
      }
    }
  }

  const saveLocal = () => localStorage.setItem('cart', JSON.stringify(cartItems.value))

  const updateCart = async (productId, partnerId, quantity = 1, price) => {
    const item = cartItems.value.find(p => p.id === productId || p.product_id === productId)

    if (item && item.product.partners.find(e => e.id === partnerId)?.pivot.quantity === item.quantity) {
      return
    }
    
    if (userStore.token) {
      try {
        const formData = new FormData()
        formData.append('product_id', productId)
        formData.append('partner_id', partnerId)
        formData.append('quantity', quantity)
        formData.append('price', +price)

        await post(`/cart/add`, formData)
        await loadCart()
      } catch (e) {
        console.error('Cart update error:', e)
        alert(e.response.data.message)
       }
    } else if (item) {
        item.quantity += quantity
        if (item.quantity <= 0) cartItems.value = cartItems.value.filter(p => p !== item)
        saveLocal()
    } else if (quantity > 0) {
        cartItems.value.push({ product_id: productId, quantity })
        saveLocal()
    }
  }

  const addToCart = (product, partner, quantity) => updateCart(product.id, partner.id, quantity ?? 1, partner.pivot.price)
  const increase = (productId, partnerId, product) => updateCart(productId, partnerId, 1, product.partners?.find(e=>e.id===partnerId).pivot.price || product.price)

  const decrease = async (productId, partnerId) => {
    const item = cartItems.value.find(p => p.product_id === productId || p.id === productId && p.partner_id === partnerId)
    if (!item) return

    if (userStore.token) {
      try {
        const newQty = 1
        
        if (item.quantity > 0) {
                const formData = new FormData()
                formData.append('product_id', productId)
                formData.append('partner_id', partnerId)
                formData.append('quantity', newQty)

                await post('/cart/decrease', formData)
        }

        loadCart()
      } catch (e) {
        console.error('Decrease error:', e)
      }
    } else {
      if (item.quantity > 1) item.quantity--
      else cartItems.value = cartItems.value.filter(p => p.id !== productId)
      saveLocal()
    }
  }
  
  const mergeGuestCart = async () => {
    const guestCart = localStorage.getItem('cart')

    if (userStore.token && guestCart) {
      try {
        const parsed = JSON.parse(guestCart)
        await post('/merge-cart', {
          guest_cart: parsed.map(i => ({ product_id: i.product_id, quantity: i.quantity }))
        })
        localStorage.removeItem('cart')
        await loadCart()
      } catch (e) { 
        console.error('Merge cart error:', e) 
      }
    }
  }

  const clearCart = () => { cartItems.value = []; loadCart() }

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
