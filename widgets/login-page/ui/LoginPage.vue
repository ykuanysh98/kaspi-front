<script setup>
import { ref } from 'vue'
import { LoginForm, RegisterForm } from '~/features/auth'

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
        <button
          @click="isLogin = !isLogin"
          class="text-blue-600 hover:underline text-sm">
          {{ isLogin ? 'Тіркелу бетіне өту' : 'Кіру бетіне өту' }}
        </button>
      </div>
    </div>
  </div>
</template>
