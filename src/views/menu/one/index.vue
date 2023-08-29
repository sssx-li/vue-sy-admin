<template>
  <div class="menu-one-container">
    menu 1
    <router-view />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'menuOne',
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
