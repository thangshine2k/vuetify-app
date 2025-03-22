<template>
    <div class="text-center ma-2">
        <v-btn @click="snackbar = true">
            Open Snackbar
        </v-btn>
        <v-snackbar v-model="snackbar" location="top">
            {{ text }}

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const text = ref("Hello, I'm a snackbar")
const snackbar = ref(false)

</script>