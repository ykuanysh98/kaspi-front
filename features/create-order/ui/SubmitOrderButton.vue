<script setup lang="ts">
import { useCart } from '@/entities/cart'
import { useUserStore } from '~/entities/user'
import { useApi } from '~/shared/api'
import { Button } from '~/shared/ui/button'

const { cartItems } = useCart()
const { post } = useApi()
const userStore = useUserStore()

const submitOrder = async () => {
  try {
    if (!userStore.token) {
      alert('Сіз логин болуыңыз керек!')
      return
    }

    const items = cartItems.value.map(item => ({
      product_id: item.product_id,
      partner_id: item.partner_id,
      quantity: item.quantity
    }))

    const res = await post('/orders', { items })

    alert('✅ ' + res.message)
    // Тапсырыс сәтті болса — себетті тазалау
    cartItems.value = []
    localStorage.removeItem('cart')
  } catch (err) {
    console.error(err)
    alert('❌ Қате шықты')
  }
}
</script>

<template>
  <Button
    v-if="userStore.token"
    variant="primary"
    @click="submitOrder">
    Тапсырыс беру
  </Button>
</template>
