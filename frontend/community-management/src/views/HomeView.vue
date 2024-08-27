<template>
  <MemberManagement />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import MemberManagement from '../components/MemberManagement.vue';
export default defineComponent({
  name: 'HomeView',

  components: {
    MemberManagement
  },
});
</script>
