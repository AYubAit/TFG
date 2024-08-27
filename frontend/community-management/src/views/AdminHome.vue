<!-- src/views/AdminHome.vue -->
<template>
    <v-container>
      <AdminDashboard />
    </v-container>
  </template>
  
  <script>
  import AdminDashboard from '../components/AdminDashboard.vue';
  
  export default {
    name: 'AdminHome',
    components: {
      AdminDashboard
    }
  }
  </script>
  