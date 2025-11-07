<template>
  <div class="container">
    <h1>Клиенты (админ)</h1>

    <section class="card">
      <h2>Добавить клиента</h2>
      <form @submit.prevent="addClient" class="form">
        <input v-model="newClient.name" placeholder="Имя" required />
        <input v-model="newClient.email" type="email" placeholder="Email" required />
        <button type="submit">Добавить</button>
      </form>
    </section>

    <section class="card">
      <h2>Список клиентов</h2>
      <table v-if="clients.length" class="clients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>
              <button @click="removeClient(client.id)" class="danger">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Клиентов пока нет.</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clients = ref([
  { id: 1, name: 'Иван Иванов', email: 'ivan@example.com' },
  { id: 2, name: 'Мария Петрова', email: 'maria@example.com' }
])

const newClient = ref({ name: '', email: '' })

function addClient() {
  const name = (newClient.value.name || '').trim()
  const email = (newClient.value.email || '').trim()
  if (!name || !email) return
  const id = Date.now()
  clients.value.push({ id, name, email })
  newClient.value.name = ''
  newClient.value.email = ''
}

function removeClient(id) {
  clients.value = clients.value.filter(c => c.id !== id)
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 24px auto;
  padding: 0 16px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

h1 {
  margin-bottom: 16px;
}

.card {
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.form {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.form input {
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  min-width: 180px;
}

.form button {
  padding: 8px 12px;
  border: none;
  background: #2563eb;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.clients-table {
  width: 100%;
  border-collapse: collapse;
}

.clients-table th,
.clients-table td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #eef2f7;
}

button.danger {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>