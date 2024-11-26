<template>
  <div>
    <div class="box">
      <div class="wave -one"></div>
      <div class="wave -two"></div>
      <div class="wave -three"></div>
    </div>
    <div class="login-container">
      <div class="login-box">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Introduce tu correo"
              required
            />
          </div>
          <div class="input-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Introduce tu contraseña"
              required
            />
          </div>
          <button type="submit" class="login-btn">Entrar</button>
          <div class="forgot-password">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
    <div v-if="showToast" class="toast">
      <p>{{ toastMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/usuarios';
import { useRouter } from 'vue-router';
import { postData, getData, putData } from '../services/apiClient.js';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const showToast = ref(false);
const toastMessage = ref('');

async function handleLogin() {
  try {
    const response = await postData('/usuarios/login', {
      email: email.value,
      password: password.value,
    });

    // Aquí obtén el token directamente desde response.token
    const token = response.token; 
    localStorage.setItem('token', token); // Guarda el token en localStorage

    authStore.setUsuario(response.usuario); // Configura el usuario en el store, si usas Pinia
    router.push('/home');  // Redirige al usuario a la página principal
  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.message || 'Error de autenticación';
    showToast.value = true;
  } finally {
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
}


</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #0e6cc4;
  overflow-x: hidden;
  overflow-y: hidden;
}

.box {
  position: fixed;
  top: 0;
  transform: rotate(80deg);
  left: 0;
}

.wave {
  position: absolute;
  top: 3%;
  left: 10%;
  background: #0af;
  width: 1500px;
  height: 1300px;
  margin-left: -150px;
  margin-top: -250px;
  transform-origin: 50% 48%;
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 1;
}

.login-box {
  background: #1c2b3b;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  width: 350px;
  text-align: center;
  color: white;
  font-family: 'Helvetica Neue', sans-serif;
}

h2 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 28px;
  margin-bottom: 20px;
  color: #e0e0e0;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #a0a0a0;
}

.input-group input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #4c5b72;
  background: #2a3b52;
  color: white;
}

.input-group input:focus {
  border-color: #007acc;
  outline: none;
  background: #3b4a63;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #007acc;
  border: none;
  color: white;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background: #005f8b;
}

.forgot-password {
  margin-top: 15px;
}

.forgot-password a {
  color: #a0a0a0;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password a:hover {
  color: #007acc;
  text-decoration: underline;
}

.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #005f8b;
  color: white;
  padding: 20px 40px;
  border-radius: 20px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: toastAnimation 0.5s ease-in-out;
  border: 3px solid #003f5c;
}

.error-message {
  margin-top: 15px;
  color: #ff4d4d;
  font-size: 14px;
  font-weight: bold;
}

@keyframes toastAnimation {
  0% {
    opacity: 0;
    transform: translateY(20px) translateX(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
}
</style>