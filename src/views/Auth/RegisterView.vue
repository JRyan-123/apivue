<script setup>
import FormInput from '@/components/FormInput.vue';
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
const { errors } = storeToRefs(auth);

onMounted(() => errors.value = {});
</script>

<template>
    <h1 class="text-3xl text-center mb-3">Register Form</h1>
    <main class="flex justify-center">

        <form @submit.prevent="auth.authenticate('register', formData)" class="w-1/2 ">
            <FormInput label="Name" placeholder="Enter Name" :error="errors.name?.[0]" v-model="formData.name" />
            <FormInput label="Email" type="email" placeholder="Enter Email" :error="errors.email?.[0]"
                v-model="formData.email" />
            <FormInput label="Password" type="password" placeholder="Enter Password" :error="errors.password?.[0]"
                v-model="formData.password" />
            <FormInput label="Confirm Password" type="password" placeholder="Confirm Password"
                v-model="formData.password_confirmation" />
            <button class="w-full px-6 py-2 text-yellow-500 border border-yellow-500 rounded-lg 
                hover:bg-yellow-500 hover:text-black hover:scale-102 transition duration-200" :disabled="auth.loading">
                {{ auth.loading ? 'Loading...' : 'Register' }}
            </button>


        </form>
    </main>
</template>
