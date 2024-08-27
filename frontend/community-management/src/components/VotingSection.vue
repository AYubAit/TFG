<!-- src/components/VotingSection.vue -->
<template>
    <v-container>
      <h2>Votacions</h2>
      <!-- Aquí va el contingut per mostrar i participar en les votacions -->
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'VotingSection',
    data() {
      return {
        openVotes: [], // Array per a les votacions obertes
      };
    },
    methods: {
      fetchOpenVotes() {
        // Implementa la lògica per obtenir les votacions obertes
      }
    },
    mounted() {
      this.fetchOpenVotes();
    }
  }
  </script>
  
  <style scoped>
  /* Estils específics per a VotingSection si cal */
  </style>
  