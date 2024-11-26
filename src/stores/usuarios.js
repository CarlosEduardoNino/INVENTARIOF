// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {

  const token = ref(localStorage.getItem('token') || null);
  const usuario = ref(localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null);

 
  function setToken(newToken) {
    if (newToken) {
      token.value = newToken;
      localStorage.setItem('token', newToken);
    } else {
      console.warn('Token no proporcionado', newToken);
    }
  }


  function setUsuario(newUsuario) {
    if (newUsuario) {
      usuario.value = newUsuario;
      localStorage.setItem('usuario', JSON.stringify(newUsuario)); 
    } else {
      console.warn('Usuario no proporcionado', newUsuario);
    }
  }

  
  function logout() {
    token.value = null;
    usuario.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  
  const isAuthenticated = () => !!token.value;

  return {
    token,
    usuario,
    setToken,
    setUsuario,
    logout,
    isAuthenticated
  };
},{
  persist:true
}
);
