<template>
  <div>
    <!-- Fondo animado con ondas -->
    <div class="box">
      <div class="wave -one"></div>
      <div class="wave -two"></div>
      <div class="wave -three"></div>
    </div>

    <q-layout view="hHh LpR fFf">
      <!-- Header -->
      <q-header elevated class="bg-blue text-white" height-hint="60">
        <q-toolbar>
          <!-- Botón para abrir/cerrar el drawer -->
          <q-btn flat round icon="menu" class="text-white q-mr-sm" @click="toggleDrawer" />
          <q-toolbar-title class="text-h5">INVENTARIO EXCLUSIVO</q-toolbar-title>
          <q-btn flat icon="exit_to_app" class="text-white" @click="logout" />
        </q-toolbar>
      </q-header>

      <!-- Drawer Sidebar -->
      <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-dark text-white">
        <div class="q-pa-md">
          <q-avatar size="56px" color="primary" icon="person" class="avatar-img" />
          <div class="text-h6 q-mt-md">Bienvenido</div>
          <div class="text-caption">Admin</div>
        </div>
        <q-list dense separator>
          <q-item clickable to="/articulos" class="list-item">
            <q-item-section avatar>
              <q-icon name="shopping_cart" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Artículos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/categorias" class="list-item">
            <q-item-section avatar>
              <q-icon name="category" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Categorías</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/entrada" class="list-item">
            <q-item-section avatar>
              <q-icon name="category" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Entradas</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/salida" class="list-item">
            <q-item-section avatar>
              <q-icon name="category" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Salida</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/devolucions" class="list-item">
            <q-item-section avatar>
              <q-icon name="category" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Devolución Salida</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/devolucione" class="list-item">
            <q-item-section avatar>
              <q-icon name="category" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Devolución Entrada</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/clientes" class="list-item">
            <q-item-section avatar>
              <q-icon name="people" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Clientes</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/proveedores" class="list-item">
            <q-item-section avatar>
              <q-icon name="local_shipping" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Proveedores</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/usuarios" class="list-item">
            <q-item-section avatar>
              <q-icon name="admin_panel_settings" color="primary" class="icon-style" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="item-label">Usuarios</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <!-- Page Content -->
      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- Footer -->
      <q-footer class="bg-blue text-white">
        <div class="text-center py-3 footer-text">© 2024 INVENTARIO EXCLUSIVO</div>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(false); // Inicialmente cerrado
    const router = useRouter();

    const toggleDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const logout = () => {
      router.push("/");
    };

    return { leftDrawerOpen, toggleDrawer, logout };
  },
};
</script>

<style>
/* Fondo animado con ondas */
.box {
  position: fixed;
  bottom: -1500px;
  right: 0;
  transform: rotate(80deg);
}

.wave {
  position: absolute;
  bottom: -100%;
  right: 10%;
  background: #0af;
  width: 1500px;
  height: 1300px;
  border-radius: 43%;
  animation: drift 7000ms infinite linear;
  opacity: 0.25;
}

.wave.-three {
  animation: drift 7500ms infinite linear;
  background-color: #77daff;
  opacity: 0.15;
}

.wave.-two {
  animation: drift 3000ms infinite linear;
  opacity: 0.05;
  background: black;
}

@keyframes drift {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Global Styles */
body {
  font-family: "Roboto", sans-serif;
  background-color: #0e6cc4; /* Fondo azul */
  overflow: hidden;
}

/* Drawer, Header, Footer, and Toolbar Styles */
.bg-blue {
  background-color: #1e3a8a !important;
}

.bg-dark {
  background-color: #2d2d2d !important;
}

.text-white {
  color: white !important;
}

.q-header {
  border-bottom: 2px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.q-drawer {
  width: 250px;
  background-color: #232526 !important;
}

.q-footer {
  font-size: 14px;
  color: white;
  border-top: 2px solid #e0e0e0;
}

.q-toolbar-title {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.footer-text {
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1px;
}
</style>