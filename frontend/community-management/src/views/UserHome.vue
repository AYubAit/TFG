<!-- src/views/UserHome.vue -->
<template>
    <v-container>
      <UserDashboard />
    </v-container>
  </template>
  
  <script>
  import UserDashboard from '@/components/UserDashboard.vue';
  
  export default {
    name: 'UserHome',
    components: {
      UserDashboard
    }
  }
  </script>
  