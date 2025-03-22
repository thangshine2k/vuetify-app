<template>
    <v-container>
      <file-pond
        ref="pond"
        accepted-file-types="image/jpeg, image/png"
        :allow-multiple="true"
        :files="files"
        @updatefiles="updateFiles"
      />
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import vueFilePond from "vue-filepond";
  import "filepond/dist/filepond.min.css";
  
  const FilePond = vueFilePond();
  const files = ref([]);
  
  const updateFiles = (newFiles) => {
    files.value = newFiles.map((file) => file.file);
  };
  </script>
  