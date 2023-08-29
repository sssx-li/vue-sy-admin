<template>
  <div class="menu-container">
    menu
    <router-view />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'menuPage',
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
