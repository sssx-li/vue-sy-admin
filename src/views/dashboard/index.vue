<template>
  <div class="dashboard-container overflow-y-auto overflow-x-hidden">
    <!-- 统计信息 -->
    <CountInfo />
  </div>
</template>

<script setup lang="ts">
import CountInfo from './components/countInfo.vue';
defineOptions({
  name: 'dashboard',
  inheritAttrs: false,
});
</script>

<style lang="scss" scoped></style>
