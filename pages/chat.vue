<script setup lang="ts">
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/entities/user'

const userStore = useUserStore()
const router = useRouter()

const users = computed(() => userStore.usersList)
const currentUser = computed(
  () => userStore.user?.name || userStore.user?.email || 'Қазіргі қолданушы'
)
const currentUserEmail = computed(() => userStore.user?.email || 'user')

const currentChat = ref<any>(null)
const searchQuery = ref('')
const messageText = ref('')
const allMessages = ref<any[]>([])

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return users.value.filter((u) => {
    // Don't chat with self
    if (u.email === currentUserEmail.value || u.name === currentUser.value)
      return false
    return (
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query)
    )
  })
})

const activeChatMessages = computed(() => {
  if (!currentChat.value) return []
  const senderEmail = currentUserEmail.value
  const receiverEmail = currentChat.value.email || currentChat.value.name

  return allMessages.value.filter(
    (msg) =>
      (msg.sender === senderEmail && msg.receiver === receiverEmail) ||
      (msg.sender === receiverEmail && msg.receiver === senderEmail)
  )
})

const messageContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

const loadMessages = () => {
  allMessages.value = JSON.parse(localStorage.getItem('chat_messages') || '[]')
  scrollToBottom()
}

const handleStorage = (event: StorageEvent) => {
  if (event.key === 'chat_messages') {
    loadMessages()
  }
}

onMounted(async () => {
  if (userStore.token) {
    try {
      await userStore.fetchUsersList()
    } catch (e) {
      console.error('Қолданушыларды жүктеу мүмкін болмады:', e)
    }
    loadMessages()
    window.addEventListener('storage', handleStorage)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', handleStorage)
})

const selectUser = (user: any) => {
  currentChat.value = user
  scrollToBottom()
}

const sendMessage = () => {
  if (!messageText.value.trim() || !currentChat.value) return

  const receiverEmail = currentChat.value.email || currentChat.value.name
  const newMessage = {
    id: Date.now(),
    sender: currentUserEmail.value,
    receiver: receiverEmail,
    text: messageText.value.trim(),
    timestamp: new Date().toISOString()
  }

  allMessages.value.push(newMessage)
  localStorage.setItem('chat_messages', JSON.stringify(allMessages.value))
  messageText.value = ''
  scrollToBottom()
}
</script>

<template>
  <div class="max-w-6xl mx-auto w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row h-[75vh]">
    <!-- Not Logged In Prompt -->
    <div
      v-if="!userStore.token"
      class="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
      <div class="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-4xl mb-4 shadow-sm">
        💬
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        Чатқа кіру шектелген
      </h2>
      <p class="text-gray-500 max-w-sm mb-6">
        Хабарлама алмасу және басқа пайдаланушылармен сөйлесу үшін алдымен
        жүйеге кіруіңіз керек.
      </p>
      <NuxtLink
        to="/login"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-200">
        Кіру бетіне өту
      </NuxtLink>
    </div>

    <!-- Main Chat Window (Logged In) -->
    <template v-else>
      <!-- Sidebar / User Selection -->
      <div class="w-full md:w-80 border-r border-gray-100 flex flex-col h-full bg-gray-55">
        <!-- Current User Info Banner -->
        <div class="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
            {{ currentUser.slice(0, 1).toUpperCase() }}
          </div>
          <div class="overflow-hidden">
            <h3 class="font-bold text-gray-800 truncate">{{ currentUser }}</h3>
            <p class="text-xs text-gray-500 truncate">{{ currentUserEmail }}</p>
          </div>
        </div>

        <!-- Search input -->
        <div class="p-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Іздеу..."
              class="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition duration-200"/>
            <span class="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
          </div>
        </div>

        <!-- Users List -->
        <div class="flex-1 overflow-y-auto px-2 pb-4">
          <div
            v-if="filteredUsers.length === 0"
            class="text-center text-gray-400 py-8 text-sm">
            Пайдаланушылар табылмады
          </div>
          <ul
            v-else
            class="space-y-1">
            <li
              v-for="user in filteredUsers"
              :key="user.id"
              @click="selectUser(user)"
              :class="[
                'p-3 rounded-xl cursor-pointer flex items-center gap-3 transition duration-200',
                currentChat?.id === user.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700 bg-white border border-gray-100',
              ]">
              <div
                :class="[
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm',
                  currentChat?.id === user.id
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-100 text-blue-600',
                ]">
                {{ (user.name || user.email || "?").slice(0, 1).toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">
                  {{ user.name || user.email }}
                </p>
                <p
                  :class="[
                    'text-xs truncate',
                    currentChat?.id === user.id
                      ? 'text-blue-100'
                      : 'text-gray-400',
                  ]">
                  {{ user.email || "Кабинет қолданушысы" }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Chat Thread / Message Window -->
      <div class="flex-1 flex flex-col h-full bg-white">
        <!-- Active Chat Header -->
        <div
          class="p-4 border-b border-gray-100 flex items-center gap-3 bg-white"
          v-if="currentChat">
          <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            {{
              (currentChat.name || currentChat.email || "?")
                .slice(0, 1)
                .toUpperCase()
            }}
          </div>
          <div>
            <h4 class="font-bold text-gray-800">
              {{ currentChat.name || currentChat.email }}
            </h4>
            <p class="text-xs text-green-500 font-medium flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
              желіде
            </p>
          </div>
        </div>

        <!-- Chat Area -->
        <div
          ref="messageContainer"
          class="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 flex flex-col space-y-4">
          <!-- Select User Placeholder -->
          <div
            v-if="!currentChat"
            class="flex-1 flex flex-col items-center justify-center text-center text-gray-400 p-8">
            <span class="text-5xl mb-3">💬</span>
            <p class="text-lg font-medium text-gray-500">
              Сөйлесуді бастау үшін
            </p>
            <p class="text-sm">сол жақтан пайдаланушыны таңдаңыз</p>
          </div>

          <!-- Messages -->
          <template v-else>
            <div
              v-if="activeChatMessages.length === 0"
              class="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
              <p>Хабарламалар жоқ. Алғашқы хабарламаңызды жіберіңіз!</p>
            </div>

            <div
              v-for="msg in activeChatMessages"
              :key="msg.id"
              :class="[
                'max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm text-sm break-words',
                msg.sender === currentUserEmail
                  ? 'bg-blue-600 text-white rounded-br-none self-end'
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-100 self-start',
              ]">
              <p class="font-semibold text-xs mb-1 opacity-75">
                {{
                  msg.sender === currentUserEmail
                    ? "Сіз"
                    : currentChat.name || currentChat.email
                }}
              </p>
              <p class="leading-relaxed">{{ msg.text }}</p>
              <span :class="['text-[10px] block text-right mt-1 opacity-60']">
                {{
                  new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </span>
            </div>
          </template>
        </div>

        <!-- Input Box -->
        <div
          class="p-4 border-t border-gray-100 bg-white"
          v-if="currentChat">
          <form
            @submit.prevent="sendMessage"
            class="flex gap-2 items-center">
            <input
              v-model="messageText"
              type="text"
              placeholder="Хабарлама жазыңыз..."
              class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition duration-200 text-sm"/>
            <button
              type="submit"
              class="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-200 flex items-center justify-center"
              :disabled="!messageText.trim()">
              <span>Жіберу</span>
            </button>
          </form>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Custom Scrollbar for better UI experience */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
</style>
