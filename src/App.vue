<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore()


onMounted(async () => {
  await authStore.fetchUser()

})
</script>

<template>
  <header class="bg-transparent shadow sticky top-0  ">
    <nav class="max-w-6xl mx-auto flex justify-between items-center py-4 px-4">
      <!-- Left -->
      <div class="flex items-center space-x-6">
        <RouterLink to="/" class="text-lg font-semibold text-gray-400 hover:text-gray-50 transition">
          Home
        </RouterLink>

        <RouterLink to="/about" class="text-lg font-semibold text-gray-400 hover:text-gray-50 transition">
          About
        </RouterLink>
      </div>

      <!-- Right -->
      <div class="flex items-center space-x-6" v-if="!authStore.user">
        <RouterLink to="/register" class="text-lg font-semibold text-gray-400 hover:text-gray-50 transition">
          Register
        </RouterLink>
        <RouterLink to="/login" class="text-lg font-semibold text-gray-400 hover:text-gray-50 transition">
          Login
        </RouterLink>
      </div>

      <div v-else class="flex items-center space-x-6">
        <RouterLink to="/dashboard" class="text-lg font-semibold text-gray-400 hover:text-gray-50 transition">
          Dashboard
        </RouterLink>
        <form @submit.prevent="authStore.logout">
          <button class=" text-lg font-semibold text-gray-400 hover:text-gray-50 transition">Logout</button>
        </form>
      </div>
    </nav>
  </header>

  <!-- Page Content -->
  <main class=" max-w-6xl mx-auto p-4 bg-dark text-white">
    <RouterView />
  </main>
</template>
