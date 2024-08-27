<!-- src/views/Unauthorized.vue -->
<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card class="mx-auto" outlined>
            <v-card-title class="text-h5">Accés Denegat</v-card-title>
            <v-card-text>
              <p>No tens permís per accedir a aquesta pàgina.</p>
              <p v-if="userRole">El teu rol actual és: {{ userRole }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="goBack">Tornar Enrere</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { getUserRole } from '@/utils/auth'; // Importa la funció getUserRole
  
  export default {
    name: 'UnauthorizedPage',
    data() {
      return {
        userRole: null,
      };
    },
    created() {
      this.userRole = getUserRole(); // Obté el rol de l'usuari quan es crea el component
    },
    methods: {
      goBack() {
        this.$router.go(-1); // Tornar a la pàgina anterior
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estils específics per al component */
  </style>
  