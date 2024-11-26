// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/login.vue';
import Homeview from '../views/home.vue';
import ArticulosView from '../views/articulos.vue';
import UsuariosView from '../views/usuarios.vue';
import CategoriasView from '../views/categorias.vue';
import ClientesView from '../views/clientes.vue';
import RegisterView from '../views/register.vue';
import ProveedoresView from '../views/proveedores.vue';


import { useAuthStore } from '../stores/usuarios';

const routes = [
  { path: '/', name: 'login', component:LoginView  },
  { path: '/home', name: 'home', component: Homeview , children: [
    { path: '/categorias', name: 'categorias', component:CategoriasView   },
    { path: '/articulos', name: 'articulos', component: ArticulosView  },
    { path: '/proveedores', name: 'proveedores', component: ProveedoresView  },
    { path: '/clientes', name: 'clientes', component: ClientesView  },
    {path: '/register', name: 'register', component: RegisterView},
    {path: '/usuarios', name :'usuarios', component: UsuariosView  }
  ]}, 
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Verificar si la ruta requiere autenticación y si el usuario está autenticado
  if (to.meta.requiresAuth && !authStore.token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
