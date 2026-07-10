<script setup>
import { ref } from 'vue'
import { LoginForm, RegisterForm } from '~/features/auth'
import { Button } from '~/shared/ui/button'

const isLogin = ref(true)
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-6">
      <h1 class="text-2xl font-bold mb-4 text-center">
        {{ isLogin ? 'Кіру' : 'Тіркелу' }}
      </h1>

      <LoginForm v-if="isLogin" />
      <RegisterForm v-else />

      <div class="text-center mt-4">
        <Button
          variant="ghost"
          @click="isLogin = !isLogin">
          {{ isLogin ? 'Тіркелу бетіне өту' : 'Кіру бетіне өту' }}
        </Button>
      </div>
    </div>
  </div>
</template>
