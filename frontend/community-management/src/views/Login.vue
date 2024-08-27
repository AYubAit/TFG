<!-- src/views/Login.vue -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="text-h5">Inicia Sessió</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" label="username" type="username" required></v-text-field>
              <v-text-field v-model="password" label="Contrasenya" type="password" required></v-text-field>
              <v-btn type="submit" color="primary" class="mt-3">Entra</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';


export default {
  name: 'UserLogin',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const route = useRoute();

    const login = async () => {
      // Implementa la lògica d'inici de sessió aquí
      // Normalment enviaràs una petició a l'API del backend
      try {
        const response = await fetch('http://localhost:5001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username.value, password: password.value }) // Convertir el objeto a JSON
        });
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('authToken', data.access_token); // Guarda el token JWT
          const redirect = route.query.redirect || '/';
          alert('Redirejeixo.' + redirect );
          router.push(redirect); // Redirige a la ruta original o a la página principal
        } else {
          alert('Error en iniciar sessió: ' + data.message);
        }
      } catch (error) {
        console.error('Error en iniciar sessió:', error);
        alert('Error en iniciar sessió.' + error);
      }
    };

    return {
      username,
      password,
      login,
    };
  }
};
</script>

<style scoped>
/* Estils específics per al component de login */
</style>