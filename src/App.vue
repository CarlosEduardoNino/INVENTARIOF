<template>
<div>
  <header></header>

    <router-view>
      
    </router-view>

</div>
</template>

<script setup>
import { computed } from 'vue';



const isAuthenticated = computed(() => authStore.token !== null);
</script>

<style>
header {
  background: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2px;
  color: white;
}
header nav {
  display: flex;
  gap: 11px;

  align-items: center;  
}
h1{
  color: #00b4ff;
  align-items: center;
  justify-content: center;

}

</style>
