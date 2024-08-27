<!-- src/components/PaymentStatus.vue -->
<template>
    <v-container>
      <h2>Estat de Pagament</h2>
      <!-- Aquí va el contingut per mostrar l'estat de pagament -->
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'PaymentStatus',
    props: {
      memberId: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        paymentHistory: [], // Aquí carregaràs l'historial de pagaments
      };
    },
    mounted() {
      this.fetchPaymentHistory(); // Funció per carregar l'historial de pagaments
    },
    methods: {
      fetchPaymentHistory() {
        // Implementar la lògica per obtenir l'historial de pagaments
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estils específics per a PaymentStatus si cal */
  </style>
  