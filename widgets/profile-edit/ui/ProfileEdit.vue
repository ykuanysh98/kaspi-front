<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/entities/user'
import { useRouter } from 'vue-router'
import { Button } from '~/shared/ui/button'
import { Input } from '~/shared/ui/input'

interface UserProfile {
  name: string
  email: string
}

const userStore = useUserStore()
const router = useRouter()

const form = ref<UserProfile>({ name: '', email: '' })

onMounted(() => {
  if (userStore.user) {
    form.value.name = userStore.user.name || ''
    form.value.email = userStore.user.email || ''
  }
})

const save = async () => {
  try {
    await userStore.updateProfile(form.value)
    router.push('/profile')
  } catch {
    alert('❌ Қате шықты, қайта көріңіз')
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg">
    <h1 class="text-2xl font-bold mb-6">Профильді өзгерту</h1>

    <div class="flex flex-col gap-4">
      <Input
        v-model="form.name"
        type="text"
        placeholder="Аты" />
      <Input
        v-model="form.email"
        type="email"
        placeholder="Email" />

      <Button
        variant="success"
        size="lg"
        block
        @click="save">
        Сақтау
      </Button>
    </div>
  </div>
</template>
