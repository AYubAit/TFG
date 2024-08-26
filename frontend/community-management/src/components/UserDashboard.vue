<template>
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="navigateTo('PaymentStatus')">Veure Estat de Pagament</v-btn>
          <v-btn @click="navigateTo('VotingSection')">Participar en Votacions</v-btn>
          <v-btn @click="navigateTo('CommunityInfo')">Veure Informació de la Comunitat</v-btn>
          <v-btn @click="navigateTo('FeedbackForm')">Enviar Feedback</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <component :is="currentComponent"></component>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import PaymentStatus from '@/components/PaymentStatus.vue'
  import VotingSection from '@/components/VotingSection.vue'
  import CommunityInfo from '@/components/CommunityInfo.vue'
  import FeedbackForm from '@/components/FeedbackForm.vue'
  
  export default {
    data() {
      return {
        currentComponent: 'PaymentStatus'
      }
    },
    methods: {
      navigateTo(component) {
        this.currentComponent = component
      }
    },
    components: {
      PaymentStatus,
      VotingSection,
      CommunityInfo,
      FeedbackForm
    }
  }
  </script>
  