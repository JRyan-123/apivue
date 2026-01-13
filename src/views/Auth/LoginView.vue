<script setup>
import { onMounted, reactive } from 'vue';
import FormInput from '@/components/FormInput.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import router from '@/router';

const auth = useAuthStore();
const { errors, loading } = storeToRefs(auth)
const formData = reactive({
    email: '',
    password: '',
});


//button submit to store validation
const login = async () => {
    const success = await auth.authenticate('login', formData);
    if (success) router.push({ name: 'dashboard' })
};

// clear old errors when page loads
onMounted(() => errors.value = {})
</script>

<template>
    <h1 class="text-3xl text-center mb-6">Login Form</h1>
    <main class="flex justify-center">
        <form @submit.prevent="login" class="w-1/2">
            <FormInput label="Email" type="email" placeholder="Enter Email" v-model="formData.email"
                :error="errors.email?.[0]" :disabled="loading" />

            <FormInput label="Password" type="password" placeholder="Enter Password" v-model="formData.password"
                :error="errors.password?.[0]" :disabled="loading" />

            <button type="submit" :class="[
                'w-full px-6 py-2 rounded-lg border transition duration-200',
                loading
                    ? 'text-yellow-500 border-yellow-500 opacity-60 cursor-not-allowed'
                    : 'text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black hover:scale-102'
            ]" :disabled="loading">
                {{ loading ? 'Loading...' : 'Login' }}
            </button>
        </form>
    </main>
</template>
