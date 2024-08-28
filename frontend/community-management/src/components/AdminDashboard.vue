<template>
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="navigateTo('MemberManagement')">Gestió de Socis</v-btn>
          <v-btn @click="navigateTo('ExpenseManagement')">Gestió de Despeses</v-btn>
          <v-btn @click="navigateTo('ProjectManagement')">Gestió de Projectes</v-btn>
          <v-btn @click="navigateTo('TaskEventProjectManagement')">Gestió de Tasques i Esdeveniments</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <component :is="currentComponent"></component>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import MemberForm from '@/components/MemberForm.vue'
  import ExpenseForm from '@/components/ExpenseForm.vue'
  import ProjectForm from '@/components/ProjectForm.vue'
  import TaskEventProjectManagement from '@/components/TaskEventProjectManagement.vue'
  
  export default {
    data() {
      return {
        currentComponent: 'MemberForm'
      }
    },
    methods: {
      navigateTo(component) {
        this.currentComponent = component
      }
    },
    components: {
      MemberForm,
      ExpenseForm,
      ProjectForm,
      TaskEventProjectManagement
      
    }
  }
  </script>
  