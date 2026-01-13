<script setup>
import FormInput from '@/components/FormInput.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const auth = useAuthStore();
const { errors, loading } = storeToRefs(auth);

//button submit to store validation
const register = async () => {
    const success = await auth.authenticate('register', formData);
    if (success) router.push({ name: 'dashboard' });
}

// clear old errors when page loads
onMounted(() => errors.value = {});
</script>

<template>
    <h1 class="text-3xl text-center mb-3">Register Form</h1>
    <main class="flex justify-center">

        <form @submit.prevent="register" class="w-1/2 ">
            <FormInput label="Name" placeholder="Enter Name" :error="errors.name?.[0]" v-model="formData.name"
                :disabled="loading" />
            <FormInput label="Email" type="email" placeholder="Enter Email" :error="errors.email?.[0]"
                v-model="formData.email" :disabled="loading" />
            <FormInput label="Password" type="password" placeholder="Enter Password" :error="errors.password?.[0]"
                v-model="formData.password" :disabled="loading" />
            <FormInput label="Confirm Password" type="password" placeholder="Confirm Password"
                v-model="formData.password_confirmation" :disabled="loading" />
            <button :class="[
                'w-full px-6 py-2 rounded-lg border transition duration-200',
                loading
                    ? 'text-yellow-500 border-yellow-500 opacity-60 cursor-not-allowed'
                    : 'text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black hover:scale-102'
            ]" :disabled="loading">
                {{ loading ? 'Loading...' : 'Register' }}
            </button>


        </form>
    </main>
</template>
