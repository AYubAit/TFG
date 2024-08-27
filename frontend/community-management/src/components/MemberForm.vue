<!-- src/components/MemberForm.vue -->
<template>
    <v-form>
      <v-text-field label="Nom del soci" v-model="member.name"></v-text-field>
      <!-- Afegir altres camps necessaris -->
    </v-form>
  </template>
  
  <script>
  export default {
    name: 'MemberForm',
    data() {
      return {
        member: {
          name: '',
          email: '',
          phone: '',
          address: '',
        }
      };
    }
  }
  </script>
  
  <style scoped>
  /* Estils específics per a MemberForm si cal */
  </style>
  