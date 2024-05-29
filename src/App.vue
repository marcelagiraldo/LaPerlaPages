<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped>
.app{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  width: 100%;
  height: 100vh;
  background-color: #F4F1BB;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>
