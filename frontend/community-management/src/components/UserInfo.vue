<template>
    <v-app>
        <v-container>
            <v-card class="mx-auto" outlined>
                <v-card-title class="text-h5">Informació Personal</v-card-title>
                <v-card-text v-if="user">
                    <p><strong>Targeta:</strong> {{ user.id }}</p>
                    <p><strong>Nom:</strong> {{ user.nom }}</p>
                    
                 
                    <p><strong>Quota:</strong> {{ user.quota }} €</p>
                    <!-- Altres camps d'informació personal -->
                </v-card-text>
                <v-card-text v-else>
                    Carregant informació...
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { isAuthenticated, getUserId } from '../utils/auth'; // Importa la funció getUser des del fitxer auth.js



// Estat per a emmagatzemar la informació de l'usuari
const user = ref(null);



// Funció per obtenir la informació de l'usuari
const loadUserInfo = async () => {

    if (!isAuthenticated()) {
        return null;
    }
    const userId = getUserId(); // Suposant que el token conté una clau 'id'

    try {
        const response = await fetch(`http://localhost:3000/socis/${userId}`);
        const data = await response.json();
        user.value = data[0]; // Assigna la informació de l'usuari a la variable 'user'
    } catch (error) {
        console.error('Error carregant la informació de l\'usuari:', error);
    }

};

// Crida la funció per carregar la informació de l'usuari quan es munta el component
onMounted(() => {
    loadUserInfo();
});
</script>