<template>
  <q-layout view="hHh LpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-blue text-white" height-hint="60">
      <q-toolbar>
        <q-toolbar-title class="text-h5">INVENTARIO EXCLUSIVO</q-toolbar-title>
        <q-btn flat icon="exit_to_app" class="text-white" @click="logout" />
      </q-toolbar>
    </q-header>

    <!-- Drawer Sidebar -->
    <q-drawer v-model="leftDrawerOpen" show-if-above side="left" bordered class="bg-dark text-white">
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
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(true);
    const router = useRouter();

    // Logout Function
    const logout = () => {
      // Logic to logout the user
      router.push('/');; // Redirect to login page
    };

    return { leftDrawerOpen, logout };
  },
};
</script>

<style scoped>
/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Body */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7fc;
}

/* Layout Background */
.bg-dark {
  background-color: #2d2d2d !important;
}

.bg-blue {
  background-color: #1e3a8a !important;
}

.text-white {
  color: white !important;
}

/* Header */
.q-header {
  border-bottom: 2px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Avatar Styling */
.avatar-img {
  border: 3px solid #2196f3;
}

/* Toolbar Styling */
.q-toolbar-title {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* Drawer Styling */
.q-drawer {
  width: 250px;
  background-color: #232526 !important;
  transition: transform 0.3s ease-in-out;
}

/* Drawer Icons */
.icon-style {
  font-size: 22px;
}

/* Item Label Styling */
.item-label {
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
}

/* Footer Styling */
.q-footer {
  background-color: #1e3a8a !important;
  color: white;
  font-size: 14px;
  border-top: 2px solid #e0e0e0;
}

/* Transition Effects for Items */
.q-item {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.q-item:hover {
  background-color: #1c2331;
  transform: translateX(5px);
}

.q-list {
  margin-top: 20px;
}

.q-item-section {
  padding: 12px;
}

/* Footer Text */
.footer-text {
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1px;
  color: #ececec;
}

/* Animations */
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Side Drawer Animation */
.q-drawer.show-if-above {
  animation: slideIn 0.5s ease-out;
}

/* Item Hover Animation */
.q-item:hover {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Header Buttons */
.q-btn.flat {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.q-btn.flat:hover {
  transform: scale(1.1);
}

/* Shadows */
.q-toolbar, .q-drawer, .q-footer {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.q-drawer {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

/* Smooth Transition for Drawer */
.q-drawer {
  transition: transform 0.3s ease-in-out;
}

/* Sidebar Item Active */
.q-item-active {
  background-color: #2196f3 !important;
}

/* Hover Effects for List Items */
.q-item:hover {
  background-color: #2196f3 !important;
  color: #fff;
}

/* Side Bar Item Active Label */
.q-item-active .item-label {
  color: #fff;
  font-weight: bold;
}

/* Sidebar Padding */
.q-pa-md {
  padding: 20px;
}

/* Responsive Styles */
@media (max-width: 767px) {
  .q-drawer {
    width: 100%;
  }

  .q-header {
    display: none;
  }

  .q-toolbar-title {
    font-size: 16px;
  }

  .q-footer {
    font-size: 12px;
  }
}

@media (max-width: 600px) {
  .q-drawer {
    width: 80%;
  }
}
</style>
