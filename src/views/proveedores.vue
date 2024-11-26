<template>
  <q-page padding>
    <h2 class="text-primary text-center q-mb-lg">Gestión de Proveedores</h2>

    <q-btn label="Nuevo Proveedor" color="primary" @click="openModal" />

    <q-table
      :rows="proveedores"
      :columns="columns"
      row-key="_id"
      bordered
      flat
      class="q-mt-md"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn
          flat
          color="primary"
          icon="edit"
          @click="editProveedor(props.row)"
          class="q-mr-sm"
        />
        <q-btn
          flat
          :color="props.row.estado === 'act' ? 'green' : 'red'"
          :icon="props.row.estado === 'act' ? 'done' : 'block'"
          @click="toggleEstado(props.row._id, props.row.estado)"
        />
      </template>
    </q-table>

    <q-dialog v-model="isModalOpen" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? "Editar Proveedor" : "Nuevo Proveedor" }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="handleSubmit" ref="formRef">
            <q-input
              v-model="proveedor.nombre"
              label="Nombre"
              filled
              type="text"
              placeholder="Nombre del proveedor"
              :rules="[val => !!val || 'El nombre es obligatorio']"
              class="q-mb-sm"
            />
            <q-input
              v-model="proveedor.identificacion"
              label="Identificación"
              filled
              type="text"
              placeholder="Identificación del proveedor"
              :rules="[val => !!val || 'La identificación es obligatoria']"
              class="q-mb-sm"
            />
            <q-input
              v-model="proveedor.tel"
              label="Teléfono"
              filled
              type="text"
              placeholder="Teléfono del proveedor"
              :rules="[val => !!val || 'El teléfono es obligatorio']"
              class="q-mb-sm"
            />
            <q-input
              v-model="proveedor.email"
              label="Email"
              filled
              type="email"
              placeholder="Correo electrónico"
              :rules="[
                val => !!val || 'El correo electrónico es obligatorio',
                val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Debe ser un correo válido'
              ]"
              class="q-mb-sm"
            />
            <div class="q-mt-md text-center">
              <q-btn label="Guardar" color="primary" type="submit" class="q-mr-sm" />
              <q-btn label="Cancelar" color="negative" flat @click="closeModal" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getData, postData, putData } from "../services/apiClient.js";

const proveedores = ref([]); 
const proveedor = ref({
  nombre: "",
  identificacion: "",
  tel: "",
  email: "",
  tipo: "proveedor",
}); 
const isModalOpen = ref(false); 
const isEditing = ref(false); 
const editingId = ref(null); 
const formRef = ref(null);

const columns = [
  { name: "nombre", label: "Nombre", align: "left", field: "nombre" },
  { name: "identificacion", label: "Identificación", align: "left", field: "identificacion" },
  { name: "tel", label: "Teléfono", align: "left", field: "tel" },
  { name: "email", label: "Email", align: "left", field: "email" },
  { name: "estado", label: "Estado", align: "center", field: "estado", format: val => (val === "act" ? "Activo" : "Inactivo") },
  { name: "actions", label: "Acciones", align: "center" },
];

async function fetchProveedores() {
  try {
    const response = await getData("/terceros/tipo/proveedor");
    proveedores.value = response;
  } catch (err) {
    console.error("Error al cargar los proveedores:", err);
  }
}

function openModal() {
  resetForm();
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

async function handleSubmit() {
  try {
    const isValid = await formRef.value.validate();
    if (!isValid) return;

    if (isEditing.value) {
      await putData(`/terceros/${editingId.value}`, { ...proveedor.value });
    } else {
      await postData("/terceros", { ...proveedor.value });
    }
    closeModal();
    fetchProveedores(); 
    resetForm(); 
  } catch (err) {
    console.error("Error al guardar el proveedor:", err);
  }
}

function editProveedor(prov) {
  proveedor.value = { 
    nombre: prov.nombre,
    identificacion: prov.identificacion,
    tel: prov.tel,
    email: prov.email,
    tipo: prov.tipo || "proveedor"
  };
  editingId.value = prov._id; 
  isEditing.value = true; 
  isModalOpen.value = true; 
}

async function toggleEstado(id, estado) {
  try {
    const newState = estado === "act" ? "inac" : "act";
    await putData(`/terceros/estado/${id}`, { estado: newState });
    fetchProveedores();
  } catch (err) {
    console.error("Error al cambiar el estado del proveedor:", err);
  }
}

function resetForm() {
  proveedor.value = { nombre: "", identificacion: "", tel: "", email: "", tipo: "proveedor" };
  isEditing.value = false;
  editingId.value = null;
}

onMounted(fetchProveedores);
</script>

<style scoped>
.text-primary {
  color: #007bff !important;
}
.text-center {
  text-align: center;
}
</style>
