<template>
  <div
    class="watermarks-container w-500px h-500px"
    v-watermarks="{ text: '水印' }"
  ></div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'watermarks',
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
