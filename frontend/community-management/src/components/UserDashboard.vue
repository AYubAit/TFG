<template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard de Gestió</v-toolbar-title>
    </v-app-bar>

    <!-- Barra lateral de navegació -->
    <v-navigation-drawer app v-model="drawer" color="grey lighten-4">
      <v-list>
        <v-list-item-group v-model="selectedItem">
          <v-list-item v-for="item in items" :key="item.title" @click="navigate(item.path)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Contingut principal -->
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Exemple de targeta per a la gestió de socis -->
          <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="400">
              <v-card-title>
                Gestió de Socis
              </v-card-title>
              <v-card-text>
                Gestioneu la informació i les quotes dels socis.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="navigate('/admin/members')">Anar a Gestió de Socis</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Exemple de targeta per a la gestió de despeses -->
          <v-col cols="12" md="6">
            <v-card class="mx-auto" max-width="400">
              <v-card-title>
                Gestió de Despeses
              </v-card-title>
              <v-card-text>
                Visualitza i gestiona les despeses de la comunitat.
              </v-card-text>
              
              <v-card-actions>
                <v-btn color="primary" @click="navigate('/admin/expenses')">Anar a Gestió de Despeses</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'Dashboard',
  data() {
    return {
      drawer: true,
      selectedItem: 0,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", path: "/dashboard" },
        { title: "Gestió de Socis", icon: "mdi-account-multiple", path: "/admin/members" },
        { title: "Gestió de Despeses", icon: "mdi-cash-multiple", path: "/admin/expenses" },
        // Afegeix més ítems de navegació segons les teves necessitats
      ],
    };
  },
  methods: {
    navigate(path) {
      this.$router.push(path); // Navega a la ruta seleccionada
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
