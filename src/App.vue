<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: #000;
  background-color: rgba(255, 255, 255, 0.6);
  transition: background-color 100000s ease-out 0.5s;
}
</style>
