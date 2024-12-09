<template>
  <div class="dashboard-container">
    <!-- Fondo de Ondas a la derecha -->
    <div class="box">
      <div class="wave -one"></div>
      <div class="wave -two"></div>
      <div class="wave -three"></div>
    </div>

    <q-layout view="hHh LpR fFf">
      <!-- Header (sin cambios) -->
      <q-header elevated class="header">
        <q-toolbar>
          <q-btn 
            flat 
            round 
            icon="menu" 
            class="menu-toggle" 
            @click="leftDrawerOpen = !leftDrawerOpen" 
          />
          <q-toolbar-title>INVENTARIO EXCLUSIVO</q-toolbar-title>
          <q-btn flat icon="logout" @click="logout">Salir</q-btn>
        </q-toolbar>
      </q-header>

      <!-- Sidebar Navigation (sin cambios) -->
      <q-drawer 
        v-model="leftDrawerOpen" 
        side="left" 
        bordered 
        class="navigation-drawer"
      >
        <div class="drawer-header">
          <q-avatar icon="person" color="primary" text-color="white" />
          <div class="user-info">
            <div class="text-h6">Bienvenido</div>
            <div class="text-subtitle2">Administrador</div>
          </div>
        </div>

        <q-list class="navigation-list">
          <q-item 
            v-for="item in navigationItems" 
            :key="item.route"
            clickable 
            :to="item.route" 
            class="navigation-item"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <!-- Main Content Area con Tarjetas Condicionales -->
      <q-page-container>
        <router-view v-slot="{ Component }">
          <div v-if="$route.path === '/home'" class="dashboard-grid-iconic">
            <q-card 
              v-for="card in dashboardCards" 
              :key="card.route"
              @click="navigateTo(card.route)"
              class="dashboard-card-iconic"
              hover
            >
              <q-card-section class="card-content">
                <q-icon :name="getIconForCard(card.title)" size="5rem" class="card-icon" />
                <div class="card-text">
                  <div class="card-title">{{ card.title }}</div>
                  <div class="card-description">{{ card.description }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <component v-else :is="Component" />
        </router-view>
      </q-page-container>

      <!-- Footer -->
      <q-footer class="footer">
        © 2024 INVENTARIO EXCLUSIVO
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const leftDrawerOpen = ref(false)

    const navigationItems = [
      { label: 'Inicio', route: '/home', icon: 'home' },
      { label: 'Artículos', route: '/articulos', icon: 'shopping_cart' },
      { label: 'Categorías', route: '/categorias', icon: 'category' },
      { label: 'Entradas', route: '/entrada', icon: 'input' },
      { label: 'Salidas', route: '/salida', icon: 'output' },
      { label: 'Devoluciones', route: '/devolucions', icon: 'replay' },
      { label: 'Devolución Entrada', route: '/devolucione', icon: 'input' },
      { label: 'Clientes', route: '/clientes', icon: 'people' },
      { label: 'Proveedores', route: '/proveedores', icon: 'local_shipping' },
      { label: 'Usuarios', route: '/usuarios', icon: 'admin_panel_settings' }
    ]

    const dashboardCards = [
      {
        title: 'Artículos',
        route: '/articulos',
        description: 'Gestiona tu inventario de productos'
      },
      {
        title: 'Categorías',
        route: '/categorias',
        description: 'Organiza tus productos por categorías'
      },
      {
        title: 'Entradas',
        route: '/entrada',
        description: 'Registra nuevos productos en inventario'
      },
      {
        title: 'Salidas',
        route: '/salida',
        description: 'Gestiona la salida de productos'
      },
      {
        title: 'Devoluciones Salida',
        route: '/devolucions',
        description: 'Maneja devoluciones de salida'
      },
      {
        title: 'Devoluciones Entrada',
        route: '/devolucione',
        description: 'Maneja devoluciones de entrada'
      },
      {
        title: 'Clientes',
        route: '/clientes',
        description: 'Administra tu base de clientes'
      },
      {
        title: 'Proveedores',
        route: '/proveedores',
        description: 'Gestiona tus proveedores'
      },
      {
        title: 'Usuarios',
        route: '/usuarios',
        description: 'Administra usuarios del sistema'
      }
    ]

    const getIconForCard = (title) => {
      const iconMap = {
        'Artículos': 'inventory_2',
        'Categorías': 'dashboard',
        'Entradas': 'add_shopping_cart',
        'Salidas': 'outbound',
        'Devoluciones Salida': 'replay',
        'Devoluciones Entrada': 'input',
        'Clientes': 'group',
        'Proveedores': 'local_shipping',
        'Usuarios': 'admin_panel_settings'
      }
      return iconMap[title] || 'list'
    }

    const navigateTo = (route) => {
      router.push(route)
    }

    const logout = () => {
      router.push('/login')
    }

    return {
      leftDrawerOpen,
      navigationItems,
      dashboardCards,
      navigateTo,
      logout,
      getIconForCard
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  position: relative;
  min-height: 100vh;
}

/* Fondo de Ondas a la derecha */
.box {
  position: fixed;
  bottom: -1500px;
  right: 0; /* Se mueve a la derecha */
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

/* Estilo para el contenido principal */
.dashboard-grid-iconic {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;
  padding: 40px;
  place-items: center;
}

.dashboard-card-iconic {
  width: 400px;
  height: 250px;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  transition: transform 0.3s, box-shadow 0.3s;
}

.dashboard-card-iconic:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.card-icon {
  color: #2196f3;
  margin-right: 20px;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.card-description {
  font-size: 1.1rem;
  color: #666;
}
</style>
