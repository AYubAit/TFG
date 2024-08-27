<!-- src/components/CommunityInfo.vue -->
<template>
    <v-container>
      <h1>Informació de la Comunitat</h1>
      <v-data-table :headers="columnas" :items="filas" class="elevation-19">  </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'CommunityInfo',
  }
  </script>
  
  <style scoped>
  /* Estils específics per a CommunityInfo si cal */
  </style>
  