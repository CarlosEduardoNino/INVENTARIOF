<template>
  <q-page padding>
    <h2 class="text-primary text-center q-mb-lg">Gestión de Categorías</h2>

    <div class="q-mb-md text-center">
      <q-btn label="Nueva Categoría" color="primary" @click="openModal" />
    </div>

    <q-table
      :rows="categorias"
      :columns="columns"
      row-key="_id"
      bordered
      flat
      class="q-mt-md"
    >
      <template v-slot:body-cell-actions="props">
        <div class="action-buttons">
          <!-- Cambié el emoji de lápiz por ✏️ y aumenté el tamaño -->
          <q-btn
            flat
            color="primary"
            label="✏️"  
            @click="editCategoria(props.row)"
            size="sm"
            class="q-mr-sm"
            style="font-size: 24px;"  
          />
          <q-btn
            flat
            :color="props.row.estado === '1' ? 'green' : 'red'"
            :icon="props.row.estado === '1' ? 'done' : 'block'"
            @click="toggleEstado(props.row._id, props.row.estado)"
            size="sm"
          />
        </div>
      </template>
    </q-table>

    <q-dialog v-model="isModalOpen" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? "Editar Categoría" : "Nueva Categoría" }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="handleSubmit" ref="formRef">
            <q-input
              v-model="categoria.nombre"
              label="Nombre"
              filled
              type="text"
              placeholder="Escribe el nombre de la categoría"
              :rules="[val => !!val || 'El nombre es obligatorio']"
              class="q-mb-sm"
            />
            <q-input
              v-model="categoria.descripcion"
              label="Descripción"
              filled
              type="text"
              placeholder="Escribe una descripción"
              :rules="[val => !!val || 'La descripción es obligatoria']"
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

    <q-dialog v-model="errorDialog" persistent>
      <q-card>
        <q-card-section>
          <div>{{ error }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" @click="errorDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getData, postData, putData } from "../services/apiClient.js";

const categorias = ref([]);
const categoria = ref({ nombre: "", descripcion: "" });
const isModalOpen = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const error = ref("");
const errorDialog = ref(false);
const formRef = ref(null);

const columns = [
  { name: "nombre", label: "Nombre", align: "left", field: "nombre" },
  { name: "descripcion", label: "Descripción", align: "left", field: "descripcion" },
  { name: "estado", label: "Estado", align: "center", field: "estado", format: val => (val === "1" ? "Activo" : "Inactivo") },
  { name: "actions", label: "Acciones", align: "center" },
];

async function fetchCategorias() {
  try {
    const response = await getData("/categorias");
    categorias.value = response;
  } catch (err) {
    showError("Error al cargar las categorías");
  }
}

async function handleSubmit() {
  try {
    const isValid = await formRef.value.validate();
    if (!isValid) return;

    if (isEditing.value) {
      if (!editingId.value) {
        showError("No se ha definido el ID de la categoría a editar.");
        return;
      }
      await putData(`/categorias/${editingId.value}`, { ...categoria.value });
    } else {
      await postData("/categorias", { ...categoria.value });
    }
    closeModal();
    fetchCategorias();
  } catch (err) {
    showError("Error al guardar la categoría");
  }
}

function editCategoria(cat) {
  categoria.value = { ...cat };
  editingId.value = cat._id;
  isEditing.value = true;
  openModal();
}

function openModal() {
  if (!isEditing.value) resetForm();
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function showError(message) {
  error.value = message;
  errorDialog.value = true;
}

function resetForm() {
  categoria.value = { nombre: "", descripcion: "" };
  isEditing.value = false;
  editingId.value = null;
}

async function toggleEstado(id, estado) {
  try {
    const newState = estado === "1" ? "0" : "1";
    await putData(`/categorias/estado/${id}`, { estado: newState });
    fetchCategorias();
  } catch (err) {
    showError("Error al cambiar el estado de la categoría");
  }
}

onMounted(fetchCategorias);
</script>

<style scoped>
.text-primary {
  color: #ffffff !important;
}

.text-center {
  text-align: center;
}

/* Contenedor de botones en la columna de acciones */
.action-buttons {
  display: flex;
  justify-content: center; /* Centra los botones horizontalmente */
  align-items: center; /* Centra los botones verticalmente */
  gap: 8px; /* Espacio entre los botones */
}

.q-btn {
  min-width: 32px; /* Tamaño mínimo para los botones */
  height: 32px; /* Altura para los botones */
}

.q-btn .q-icon {
  font-size: 18px; /* Ajustar el tamaño del ícono */
}

.q-table .q-td {
  vertical-align: middle; /* Centra verticalmente los botones */
}
</style>
