<!-- src/components/ExpenseForm.vue -->
<template>
    <v-form>
      <!-- Aquí va el formulari per a registrar les despeses -->
      <v-text-field label="Descripció de la despesa" v-model="expense.description"></v-text-field>
      <!-- Afegir altres camps necessaris -->
    </v-form>
  </template>
  
  <script>
  export default {
    name: 'ExpenseForm',
    data() {
      return {
        expense: {
          description: '',
          amount: 0,
          date: new Date().toISOString().substr(0, 10),
        }
      };
    }
  }
  </script>
  
  <style scoped>
  /* Estils específics per a ExpenseForm si cal */
  </style>
  