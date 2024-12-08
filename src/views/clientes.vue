<template>
  <q-page padding>
    <h2>Gestión de Clientes</h2>

    <q-btn label="Nuevo Cliente" color="primary" @click="openModal" />

    <q-table
      :rows="clientes"
      :columns="columns"
      row-key="_id"
      bordered
      flat
      class="q-mt-md"
    >
      <template v-slot:body-cell-actions="props">
        <div class="action-buttons">
          <q-btn
            flat
            color="primary"
            icon="✏️"
            @click="editCliente(props.row)"
            class="q-mr-sm"
            size="md"  
          />
          <q-btn
            flat
            :color="props.row.estado === 'act' ? 'green' : 'negative'"
            :icon="props.row.estado === 'act' ? 'block' : 'done'"
            @click="toggleEstado(props.row._id, props.row.estado)"
            size="md" 
          />
        </div>
      </template>
    </q-table>

    <q-dialog v-model="isModalOpen" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? "Editar Cliente" : "Nuevo Cliente" }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="handleSubmit">
            <q-input
              v-model="cliente.nombre"
              label="Nombre"
              filled
              type="text"
              placeholder="Nombre del cliente"
              :rules="[val => !!val || 'El nombre es obligatorio']"
              class="q-mb-sm"
            />
            <q-input
              v-model="cliente.identificacion"
              label="Identificación"
              filled
              type="text"
              placeholder="Identificación del cliente"
              :rules="[val => !!val || 'La identificación es obligatoria']"
              class="q-mb-sm"
            />
            <q-input
              v-model="cliente.tel"
              label="Teléfono"
              filled
              type="text"
              placeholder="Teléfono del cliente"
              :rules="[val => !!val || 'El teléfono es obligatorio']"
              class="q-mb-sm"
            />
            <q-input
              v-model="cliente.email"
              label="Email"
              filled
              type="email"
              placeholder="Correo electrónico"
              :rules="[val => !!val || 'El correo es obligatorio']"
              class="q-mb-sm"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" @click="closeModal" />
          <q-btn flat label="Guardar" color="primary" @click="handleSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getData, postData, putData } from "../services/apiClient.js";

const clientes = ref([]);
const cliente = ref({
  nombre: "",
  identificacion: "",
  tel: "",
  email: "",
  tipo: "client",
});
const isModalOpen = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const columns = [
  { name: "nombre", label: "Nombre", align: "left", field: "nombre" },
  { name: "identificacion", label: "Identificación", align: "left", field: "identificacion" },
  { name: "tel", label: "Teléfono", align: "left", field: "tel" },
  { name: "email", label: "Email", align: "left", field: "email" },
  { name: "estado", label: "Estado", align: "center", field: "estado", format: val => (val === "act" ? "Activo" : "Inactivo") },
  { name: "actions", label: "Acciones", align: "center" },
];

async function fetchClientes() {
  try {
    const response = await getData("/terceros/tipo/client");
    clientes.value = response;
  } catch (err) {
    console.error("Error al cargar los clientes:", err);
  }
}

function openModal() {
  resetForm();
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function editCliente(cli) {
  cliente.value = { 
    nombre: cli.nombre,
    identificacion: cli.identificacion,
    tel: cli.tel,
    email: cli.email,
    tipo: cli.tipo || "client"
  };
  editingId.value = cli._id;  
  isEditing.value = true;     
  isModalOpen.value = true;   
}

async function handleSubmit() {
  try {
    if (isEditing.value) {
      // Use the stored editingId for the PUT request
      await putData(`/terceros/${editingId.value}`, { ...cliente.value });
    } else {
      await postData("/terceros", { ...cliente.value });
    }
    closeModal();
    fetchClientes(); 
    resetForm(); 
  } catch (err) {
    console.error("Error al guardar el cliente:", err);
  }
}

async function toggleEstado(id, estado) {
  try {
    const newState = estado === "act" ? "inac" : "act";
    await putData(`/terceros/estado/${id}`, { estado: newState });
    fetchClientes();
  } catch (err) {
    console.error("Error al cambiar el estado del cliente:", err);
  }
}

function resetForm() {
  cliente.value = { nombre: "", identificacion: "", tel: "", email: "", tipo: "client" };
  isEditing.value = false;
  editingId.value = null;
}

onMounted(fetchClientes);
</script>

<style scoped>
/* Estilo para centrar los botones de acción */
.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px; /* Espaciado ligeramente mayor entre los botones */
}
.text-primary {
  color: #ffffff !important;
  justify-content: center;
  align-items: center;
  display: flex;
}
/* Aumento del tamaño de los botones */
.q-btn {
  min-width: 40px;  /* Mayor tamaño mínimo */
  height: 40px;  /* Botón más alto */
}

.q-btn .q-icon {
  font-size: 22px;  /* Íconos más grandes */
}

/* Asegurarse que las celdas están alineadas verticalmente */
.q-table .q-td {
  vertical-align: middle;
}
</style>
