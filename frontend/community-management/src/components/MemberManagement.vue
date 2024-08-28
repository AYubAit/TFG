<template>
    <v-app>
        <v-container>
            <!-- Botó per afegir un nou soci -->
            <v-btn color="primary" @click="openDialog('create')">Afegeix Nou Soci</v-btn>

            <!-- Camp de cerca -->
            <v-text-field v-model="search" label="Cerca per Targeta, Nom o Telèfon..." class="mx-4 my-2"
                clearable></v-text-field>

            <!-- Taula de dades amb camp de cerca -->
            <v-toolbar-title>Gestió de Socis</v-toolbar-title>
            <v-data-table :headers="headers" :items="formattedSocis" :items-per-page="6" class="elevation-10">
                <!-- Slot per a les accions -->
                <template #[`item.actions`]="{ item }">
                    <v-icon size="large" color="yellow" @click="openDialog('edit', item)">mdi-pencil</v-icon>

                    <v-icon size="large" color="red" @click="confirmDeleteSoci(item.Targeta)">mdi-delete</v-icon>
                </template>
            </v-data-table>

            <!-- Diàleg per a crear/editar socis -->
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span v-if="isEditMode">Edita Soci</span>
                        <span v-else>Afegeix Nou Soci</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedSoci.Nom" label="Nom"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedSoci.Telefon" label="Telefon"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedSoci.Quota" label="Quota"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select v-model="editedSoci.Categoria" :items="categorias" label="Categoria"
                                        clearable></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="closeDialog">Cancel·la</v-btn>
                        <v-btn color="blue darken-1" text @click="saveSoci">Guarda</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


            <!-- Diàleg de confirmació per eliminar un soci -->
            <v-dialog v-model="confirmDialog" max-width="400px">
                <v-card>
                    <v-card-title class="text-h5">Confirmació</v-card-title>
                    <v-card-text>
                        Estàs segur que vols eliminar aquest soci?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="green darken-1" text @click="closeConfirmDialog">Cancel·la</v-btn>
                        <v-btn color="red darken-1" text @click="deleteSoci(confirmSociId)">Elimina</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const socis = ref([]);
const search = ref('');
const socisLoaded = ref(false);
const dialog = ref(false);
const editedSoci = ref({ Targeta: null, Nom: '', Telefon: '', Quota: '', Categori: '' });
const confirmDialog = ref(false); // Variable per al diàleg de confirmació
const confirmSociId = ref(null); // Identificador del soci a eliminar
const isEditMode = ref(false);


// Configuració de les capçaleres de la taula
const headers = [
    { title: 'Targeta', key: 'Targeta' },
    { title: 'Nom', key: 'Nom' },

    { title: 'Quota', key: 'Quota' },
    { title: 'Total', key: 'total_pendent' },
    { title: 'Accions', key: 'actions', sortable: false },
];
const categorias = ["Soci", "Junta", "Voluntari"];
// Propietat computada per filtrar socis basat en el camp de cerca
const filteredSocis = computed(() => {
    if (!search.value) {
        return socis.value;
    }
    const searchTerm = search.value.toLowerCase();
    return socis.value.filter((soci) =>
        ['Targeta', 'Nom', 'Telefon'].some((key) =>
            soci[key] && String(soci[key]).toLowerCase().includes(searchTerm)
        )
    );
});

// Propietat computada per formatar els valors de "Total Pendents" amb el símbol d'euro
const formattedSocis = computed(() => {
    return filteredSocis.value.map(soci => ({
        ...soci,
        total_pendent: `${soci.total_pendent} €`  // Format de moneda amb el símbol d'euro
    }));
});

onMounted(() => {
    loadSocis(); // Carrega socis quan es munta el component
});
const loadSocis = () => {
    fetch('http://localhost:3000/socisAmbCuotesPendents')
        .then((response) => response.json())
        .then((data) => {
            socis.value = data;
            socisLoaded.value = true;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};

// Obre el diàleg per a crear o editar socis
const openDialog = (mode, soci = null) => {
    isEditMode.value = mode === 'edit';
    editedSoci.value = soci
        ? { ...soci }
        : { id: null, nom: '', telefon: '', quota: '', categoria: '' }; // Inicialitzar amb categoria buida
    dialog.value = true;
};

// Tanca el diàleg
const closeDialog = () => {
    dialog.value = false;
    editedSoci.value = { id: null, nom: '', telefon: '', quota: '', categoria: '' }; // Reiniciar la categoria
};

// Afegeix aquesta funció per a mostrar el diàleg de confirmació
const confirmDeleteSoci = (soci) => {
  confirmSociId.value = soci; // Assignar l'identificador del soci a eliminar
  confirmDialog.value = true; // Obrir el diàleg de confirmació
};

// Tanca el diàleg de confirmació sense eliminar
const closeConfirmDialog = () => {
  confirmDialog.value = false;
  confirmSociId.value = null;
};
// Desa o crea un soci
const saveSoci = () => {
    console.log(editedSoci.value)
    if (isEditMode.value) {
        // Lògica per a actualitzar el soci
        fetch(`http://localhost:3000/socis`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(editedSoci.value),
        })
            .then((response) => response.json())
            .then((updatedSoci) => {
                const index = socis.value.findIndex((soci) => soci.Targeta === updatedSoci.id);
                if (index !== -1) socis.value.splice(index, 1, updatedSoci);
                closeDialog();
                loadSocis();  // Carrega socis quan es actualitza un soci
            })
            .catch((error) => console.error('Error updating soci:', error));
    } else {
        // Lògica per a crear un nou soci
        fetch('http://localhost:3000/socis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedSoci.value),
        })
            .then((response) => response.json())
            .then((newSoci) => {
                socis.value.push(newSoci);
                closeDialog();
                loadSocis();  // Carrega socis quan es crea un soci

            })
            .catch((error) => console.error('Error creating soci:', error));
    }
};

// Elimina un soci
const deleteSoci = (id) => {
    fetch(`http://localhost:3000/socis/${id}`, { method: 'DELETE' })
        .then(() => {
            socis.value = socis.value.filter((soci) => soci.id !== id);
            closeConfirmDialog();
            loadSocis();  // Carrega socis quan es elimina un soci
        })
        .catch((error) => console.error('Error deleting soci:', error));
};
</script>