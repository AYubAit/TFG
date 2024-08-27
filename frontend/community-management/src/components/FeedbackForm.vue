<!-- src/components/FeedbackForm.vue -->
<template>
    <v-form>
      <v-textarea label="El teu feedback" v-model="feedback"></v-textarea>
      <!-- Afegir altres camps necessaris -->
    </v-form>
  </template>
  
  <script>
  export default {
    name: 'FeedbackForm',
    data() {
      return {
        feedback: '',
      };
    }
  }
  </script>
  
  <style scoped>
  /* Estils específics per a FeedbackForm si cal */
  </style>
  