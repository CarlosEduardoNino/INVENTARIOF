<template>
  <q-page padding>
    <h2 class="text-primary text-center q-mb-lg">Gestión de Usuarios</h2>

    <q-btn label="Nuevo Usuario" color="primary" @click="openModal" />

    <q-table
      :rows="usuarios"
      :columns="columns"
      row-key="_id"
      bordered
      flat
      class="q-mt-md"
    >
      <template v-slot:body-cell-actions="props">
        <!-- Contenedor de botones centrado -->
        <div class="actions-cell">
          <q-btn
            flat
            color="primary"
            icon="✏️"
            @click="editUsuario(props.row)"
            class="q-mr-sm"
          />
          <q-btn
            flat
            :color="props.row.estado === 'activo' ? 'green' : 'red'"
            :icon="props.row.estado === 'activo' ? 'done' : 'block'"
            @click="toggleEstado(props.row._id, props.row.estado)"
          />
        </div>
      </template>
    </q-table>

    <q-dialog v-model="isModalOpen" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEditing ? "Editar Usuario" : "Nuevo Usuario" }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="handleSubmit">
            <q-input
              v-model="usuario.nombre"
              label="Nombre"
              filled
              type="text"
              placeholder="Nombre del usuario"
              :rules="[val => !!val || 'El nombre es obligatorio']"
              class="q-mb-sm"
            />
            <q-input
              v-model="usuario.email"
              label="Correo electrónico"
              filled
              type="email"
              placeholder="Correo electrónico"
              :rules="[val => !!val || 'El correo es obligatorio']"
              class="q-mb-sm"
            />
           
            <q-input
              v-model="usuario.password"
              label="Contraseña"
              filled
              type="password"
              placeholder="Contraseña"
              :rules="[ 
                val => !isEditing || !val || val.length >= 6 || 
                'La contraseña debe tener al menos 6 caracteres'
              ]"
              :hint="isEditing ? 'Dejar en blanco para mantener la contraseña actual' : ''"
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
import { getData, putData, postData } from "../services/apiClient.js";
import { useQuasar } from 'quasar';

const q = useQuasar();
const usuarios = ref([]);
const usuario = ref({
  nombre: "",
  email: "",
  password: "",
  estado: "activo",
});
const isModalOpen = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const columns = [
  { name: "nombre", label: "Nombre", align: "left", field: "nombre" },
  { name: "email", label: "Correo electrónico", align: "left", field: "email" },
  { name: "estado", label: "Estado", align: "center", field: "estado", 
    format: val => (val === "activo" ? "Activo" : "Inactivo") },
  { name: "actions", label: "Acciones", align: "center" },
];

async function fetchUsuarios() {
  try {
    const response = await getData("/usuarios/usuarios");
    usuarios.value = response;
  } catch (err) {
    q.notify({
      type: 'negative',
      message: 'Error al cargar los usuarios'
    });
  }
}

function openModal() {
  resetForm();
  isEditing.value = false;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  resetForm();
}

async function handleSubmit() {
  try {
    if (isEditing.value) {
      const userData = {
        nombre: usuario.value.nombre,
        email: usuario.value.email,
      };

      if (usuario.value.password && usuario.value.password.trim() !== '') {
        userData.password = usuario.value.password;
      }

      await putData(`/usuarios/usuarios/${editingId.value}`, userData);
    } else {
      await postData("/usuarios/register", { 
        ...usuario.value,
        estado: 'activo',
      });
    }
    closeModal();
    await fetchUsuarios();
  } catch (err) {
    console.error('Error:', err);
  }
}

async function toggleEstado(id, estado) {
  try {
    await putData(`/usuarios/estado/${id}`);
    await fetchUsuarios();
    q.notify({
      type: 'positive',
      message: 'Estado actualizado correctamente'
    });
  } catch (err) {
    q.notify({
      type: 'negative',
      message: 'Error al cambiar el estado del usuario'
    });
  }
}

function editUsuario(user) {
  usuario.value = { 
    nombre: user.nombre,
    email: user.email,
    password: "", 
    estado: user.estado,
    rol: user.rol || "user",
  };
  editingId.value = user._id;
  isEditing.value = true;
  isModalOpen.value = true;
}

function resetForm() {
  usuario.value = { nombre: "", email: "", password: "", estado: "activo", rol: "user" };
  isEditing.value = false;
  editingId.value = null;
}

onMounted(fetchUsuarios);
</script>

<style scoped>
.text-primary {
  color: #ffffff !important;
}

.text-center {
  text-align: center;
}

/* Estilos para centrar los botones de acciones */
.actions-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
