<!-- src/components/ProjectForm.vue -->
<template>
    <v-form>
      <v-text-field label="Nom del projecte" v-model="project.name"></v-text-field>
      <!-- Afegir altres camps necessaris -->
    </v-form>
  </template>
  
  <script>
  export default {
    name: 'ProjectForm',
    data() {
      return {
        project: {
          name: '',
          description: '',
          budget: 0,
          startDate: new Date().toISOString().substr(0, 10),
        }
      };
    }
  }
  </script>
  
  <style scoped>
  /* Estils específics per a ProjectForm si cal */
  </style>
  