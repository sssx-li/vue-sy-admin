<template>
  <div
    class="watermarks-container w-100% h-100%"
    v-watermarks="{
      text: '这是水印',
      textColor: '#f60',
      styles: { height: 80 },
    }"
  ></div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'watermarks',
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
