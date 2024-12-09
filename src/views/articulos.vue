<template>
  <q-page padding>
    <h2 class="text-center text-primary q-mb-lg">Gestión de Artículos</h2>

    <q-btn
      color="primary"
      label="Nuevo Artículo"
      icon="add"
      class="q-mb-md"
      @click="openModal"
    />

    <q-dialog v-model="isModalOpen" persistent>
      <q-card>
        <q-card-section>
          <h2 class="text-primary">Gestión de Artículos</h2>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="handleSubmit" ref="formRef">
            <q-input
              v-model="articulo.nombre"
              label="Nombre del Artículo"
              filled
              type="text"
              placeholder="Nombre del artículo"
              :rules="[(val) => !!val || 'El nombre es obligatorio']"
              class="q-mb-sm"
            />
            <q-input
              v-model.number="articulo.precio"
              label="Precio"
              filled
              type="number"
              placeholder="Precio del artículo"
              :rules="[ (val) => val !== undefined && val !== null || 'El precio es obligatorio', (val) => val >= 0 || 'El precio debe ser mayor o igual a 0' ]"
              class="q-mb-sm"
            />
            <q-input
              v-model.number="articulo.stock"
              label="Stock"
              filled
              type="number"
              placeholder="Cantidad en stock"
              :rules="[ (val) => val !== undefined && val !== null || 'El stock es obligatorio', (val) => val >= 0 || 'El stock debe ser mayor o igual a 0' ]"
              class="q-mb-sm"
            />
            <q-select
              v-model="articulo.categoria"
              label="Categoría"
              :options="categorias"
              option-value="_id"
              option-label="nombre"
              filled
              placeholder="Selecciona una categoría"
              :rules="[(val) => !!val || 'La categoría es obligatoria']"
              class="q-mb-sm"
            />
            <div class="text-center">
              <q-btn color="primary" label="Guardar" type="submit" class="q-mr-sm" />
              <q-btn label="Cancelar" color="negative" flat @click="cancelEdit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-table
      :rows="articulos"
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
            @click="editArticulo(props.row)"
            size="sm"
            class="q-mr-sm"
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
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getData, postData, putData } from "../services/apiClient.js";

const articulos = ref([]);
const categorias = ref([]);
const articulo = ref({ nombre: "", precio: 0, stock: 0, categoria: "" });
const isEditing = ref(false);
const editingId = ref(null);
const isModalOpen = ref(false);
const formRef = ref(null);

const columns = [
  { name: "nombre", label: "Nombre", align: "left", field: "nombre" },
  { name: "precio", label: "Precio", align: "right", field: "precio" },
  { name: "stock", label: "Stock", align: "right", field: "stock" },
  {
    name: "categoria",
    label: "Categoría",
    align: "left",
    field: "categoria",
    format: (val) => categorias.value.find((cat) => cat._id === val)?.nombre || "Sin categoría",
  },
  { name: "estado", label: "Estado", align: "center", field: "estado", format: val => (val === "1" ? "Activo" : "Inactivo") },
  { name: "actions", label: "Acciones", align: "center" },
];

function openModal() {
  resetForm();
  isModalOpen.value = true;
}

async function fetchCategorias() {
  try {
    const response = await getData("/categorias");
    categorias.value = response;
  } catch (err) {
    console.error("Error al cargar las categorías:", err);
  }
}

async function fetchArticulos() {
  try {
    const response = await getData("/articulos");
    articulos.value = response;
  } catch (err) {
    console.error("Error al cargar los artículos:", err);
  }
}

async function handleSubmit() {
  try {
    const isValid = await formRef.value.validate();
    if (!isValid) return;

    const payload = {
      ...articulo.value,
      categoria: articulo.value.categoria._id,
    };

    if (isEditing.value) {
      await putData(`/articulos/${editingId.value}`, payload);
    } else {
      await postData("/articulos", payload);
    }

    resetForm();
    isModalOpen.value = false;
    fetchArticulos();
  } catch (err) {
    console.error("Error al guardar el artículo:", err);
  }
}

function editArticulo(art) {
  articulo.value = { ...art };
  editingId.value = art._id;
  isEditing.value = true;
  isModalOpen.value = true;
}

async function toggleEstado(id, estado) {
  try {
    const newState = estado === "1" ? "0" : "1";
    await putData(`/articulos/estado/${id}`, { estado: newState });
    fetchArticulos();
  } catch (err) {
    console.error("Error al cambiar el estado del artículo:", err);
  }
}

function cancelEdit() {
  resetForm();
  isModalOpen.value = false;
}

function resetForm() {
  articulo.value = { nombre: "", precio: 0, stock: 0, categoria: "" };
  isEditing.value = false;
  editingId.value = null;
}

onMounted(() => {
  fetchCategorias();
  fetchArticulos();
});
</script>

<style scoped>
.text-primary {
  color: #ffffff !important;
}
.text-center {
  text-align: center;
}

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
  vertical-align: middle; /* Centrar verticalmente los botones */
}
</style>
