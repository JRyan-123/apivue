<script setup>
import { defineModel, defineProps } from 'vue';
const model = defineModel();

const props = defineProps({
    label: String,
    type: { type: String, default: "text" },
    error: { type: String, default: "" },
    placeholder: { type: String, default: "" }
})
</script>
<template>

    <div class="mb-4">

        <label class="block font-medium mb-1 text-white">
            {{ label }}
        </label>

        <input :type="type" :placeholder="placeholder" v-model="model"
            class="w-full px-3 py-2 rounded bg-gray-600 text-white border border-gray-50 focus:border-amber-300 outline-none ">

        <p v-if="error" class="text-red-500 text-sm mt-1">
            {{ error }}
        </p>

    </div>
</template>